import { initContract } from "@ts-rest/core";
import { z } from "zod";

const id = z.string().uuid();

const status = z.enum(["TODO", "IN_PROGRESS", "DONE"] as const);
export type Status = z.infer<typeof status>;

const todo = z.object({
  id,
  name: z.string(),
  status,
  lastUpdated: z.coerce.date(),
});
export type Todo = z.infer<typeof todo>;

const board = z.object({
  id,
  name: z.string(),
  todos: z.array(todo),
});
export type Board = z.infer<typeof board>;

export const contract = initContract().router(
  {
    getBoard: {
      method: "GET",
      path: "/boards/:id",
      pathParams: z.object({ id }),
      responses: { 200: board, 404: z.literal("NOT_FOUND") },
    },
    postBoard: {
      method: "POST",
      path: "/boards",
      body: board.pick({ name: true }),
      responses: { 200: board },
    },
    postTodo: {
      method: "POST",
      path: "/todos",
      body: z.intersection(todo.pick({ name: true, status: true }), z.object({ boardId: id })),
      responses: { 200: todo, 404: z.literal("NOT_FOUND") },
    },
    deleteTodo: {
      method: "DELETE",
      path: "/todos/:id",
      pathParams: z.object({ id }),
      body: z.object({}),
      responses: { 200: todo, 404: z.literal("NOT_FOUND") },
    },
  },
  { pathPrefix: "/api", strictStatusCodes: true },
);

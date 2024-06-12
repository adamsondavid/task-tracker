import { contract } from "../common/contract";
import { initServer } from "ts-rest-hono";
import { v4 as uuid } from "uuid";
import { boards, initDb, todos } from "./db";
import { eq } from "drizzle-orm";

export function initRouter(db: ReturnType<typeof initDb>) {
  return initServer().router(contract, {
    async getBoard({ params }) {
      const board = await db.query.boards.findFirst({
        with: { todos: true },
        where: eq(boards.id, params.id),
      });
      if (!board) return { status: 404, body: "NOT_FOUND" };
      else return { status: 200, body: board };
    },

    async postBoard({ body }) {
      const [board] = await db
        .insert(boards)
        .values({ id: uuid(), ...body })
        .returning();
      return { status: 200, body: { ...board, todos: [] } };
    },

    async postTodo({ body }) {
      const [todo] = await db
        .insert(todos)
        .values({ id: uuid(), ...body, lastUpdated: new Date() })
        .returning();
      return { status: 200, body: todo };
    },

    async deleteTodo({ params }) {
      const [todo] = await db.delete(todos).where(eq(todos.id, params.id)).returning();
      if (!todo) return { status: 404, body: "NOT_FOUND" };
      return { status: 200, body: todo };
    },
  });
}

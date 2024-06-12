import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { relations } from "drizzle-orm";

export const boards = sqliteTable("boards", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const todos = sqliteTable("todos", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  status: text("status", { enum: ["TODO", "IN_PROGRESS", "DONE"] }).notNull(),
  lastUpdated: integer("lastUpdated", { mode: "timestamp" }).notNull(),
  boardId: text("boardId")
    .notNull()
    .references(() => boards.id, { onDelete: "cascade" }),
});

export const boardsRelations = relations(boards, ({ many }) => ({
  todos: many(todos),
}));

export const todosRelations = relations(todos, ({ one }) => ({
  board: one(boards, { fields: [todos.boardId], references: [boards.id] }),
}));

export function initDb(url: string, authToken?: string) {
  const connection = createClient({ url, authToken });
  return drizzle(connection, { schema: { boards, todos, boardsRelations, todosRelations } });
}

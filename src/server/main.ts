import { z } from "zod";
import { initRouter } from "./router";
import { Hono } from "hono";
import { createHonoEndpoints } from "ts-rest-hono";
import { contract } from "../common/contract";
import { initDb } from "./db";

export function initApp(unvalidatedEnv: unknown) {
  const env = z
    .object({
      DB_CONNECTION_URL: z.string(),
      DB_AUTH_TOKEN: z.string().optional(),
    })
    .parse(unvalidatedEnv);

  const db = initDb(env.DB_CONNECTION_URL, env.DB_AUTH_TOKEN);
  const router = initRouter(db);

  const app = new Hono();
  createHonoEndpoints(contract, router, app, { logInitialization: false, jsonQuery: true, responseValidation: true });
  return app;
}

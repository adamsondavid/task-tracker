import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config();
export default defineConfig({
  schema: "./src/server/db.ts",
  out: "./drizzle",
  dialect: "sqlite",
  driver: "turso",
  dbCredentials: {
    url: process.env.DB_CONNECTION_URL!,
    authToken: process.env.DB_AUTH_TOKEN,
  },
});

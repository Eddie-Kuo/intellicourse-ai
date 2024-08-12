import { config } from "dotenv";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as users from "./schema/users";
import * as courses from "./schema/courses";
import * as units from "./schema/units";
import * as chapters from "./schema/chapters";

config({ path: ".env" });

export const client = createClient({
  url: "libsql://intellicourse-ai-eddie-kuo.turso.io",
  authToken: process.env.DATABASE_AUTH_TOKEN as string,
});

export const db = drizzle(client, {
  schema: { ...users, ...courses, ...units, ...chapters },
});

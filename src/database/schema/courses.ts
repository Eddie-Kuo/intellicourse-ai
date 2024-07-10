// id - integer - primary key auto increment
// userId <> users.id
// title - text

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { sql } from "drizzle-orm";

export const courses = sqliteTable("courses", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.clerkUserId, { onDelete: "cascade" }),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

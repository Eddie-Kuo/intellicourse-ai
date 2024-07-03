// id - integer - primary key auto increment
// userId <> users.id
// title - text

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { usersTable } from "./users";
import { sql } from "drizzle-orm";

export const coursesTable = sqliteTable("courses", {
  id: integer("id").primaryKey(),
  title: text("title").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  createdAt: text("created_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

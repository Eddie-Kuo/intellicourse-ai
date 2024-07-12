// id - integer - primary key auto increment
// unit number - number
// title - text
// courseId <> courses.id

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { courses } from "./courses";
import { users } from "@/database/schema/users";

export const units = sqliteTable("units", {
  id: integer("id").primaryKey(),
  unit: integer("unit").notNull(),
  title: text("title").notNull(),
  courseId: integer("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
});

export type SelectUnit = typeof units.$inferSelect;

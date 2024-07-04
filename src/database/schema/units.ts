// id - integer - primary key auto increment
// unit number - number
// title - text
// courseId <> courses.id

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { coursesTable } from "./courses";

export const unitsTable = sqliteTable("units", {
  id: integer("id").primaryKey(),
  unit: integer("unit").notNull(),
  title: text("title").notNull(),
  courseId: integer("course_id")
    .notNull()
    .references(() => coursesTable.id, { onDelete: "cascade" }),
});

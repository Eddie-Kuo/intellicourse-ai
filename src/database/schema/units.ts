// id - integer - primary key auto increment
// unit number - number
// title - text
// courseId <> courses.id

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { courses } from "./courses";
import { relations } from "drizzle-orm";
import { chapters } from "@/database/schema/chapters";

export const units = sqliteTable("units", {
  id: integer("id").primaryKey(),
  unit: integer("unit").notNull(),
  title: text("title").notNull(),
  courseId: integer("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
});

// relations:
export const unitRelations = relations(units, ({ one, many }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  chapters: many(chapters),
}));

export type SelectUnit = typeof units.$inferSelect;

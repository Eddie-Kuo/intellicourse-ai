// id - integer - primary key auto increment
// unit number - number
// title - text
// courseId <> courses.id

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { courses } from "./courses";
import { users } from "@/database/schema/users";
import { relations } from "drizzle-orm";
import course from "@/lib/validations/course";
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
// each unit belongs to only one chapter
export const unitRelations = relations(units, ({ one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
}));

// each unit can have many chapters
export const chapterRelations = relations(units, ({ many }) => ({
  chapters: many(chapters),
}));

export type SelectUnit = typeof units.$inferSelect;

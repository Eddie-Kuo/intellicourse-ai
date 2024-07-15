// id - integer - primary key auto increment
// chapter number - number
// title - text
// youtube video id - text
// youtube video summary - text
// unitId <> units.id

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { units } from "./units";
import { relations } from "drizzle-orm";
import { courses } from "@/database/schema/courses";

export const chapters = sqliteTable("chapters", {
  id: integer("id").primaryKey(),
  chapter: integer("chapter").notNull(),
  title: text("title").notNull(),
  ytVideoId: text("yt_video_id").notNull(),
  ytVideoSummary: text("yt_video_summary").notNull(),
  question: text("question").notNull(),
  answer: text("answer"),
  optionOne: text("option_one"),
  optionTwo: text("option_two"),
  optionThree: text("option_three"),
  unitId: integer("unit_id")
    .notNull()
    .references(() => units.id, { onDelete: "cascade" }),
});

// relations:
// each chapter belongs to only one unit
export const chapterRelations = relations(chapters, ({ one }) => ({
  course: one(units, {
    fields: [chapters.unitId],
    references: [units.id],
  }),
}));

export type SelectChapter = typeof chapters.$inferSelect;

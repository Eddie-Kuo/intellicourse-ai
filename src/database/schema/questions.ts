// id - integer - primary key auto increment
// chapterId <> chapters.id
// question - text
// answer - text
// option one - text
// option two - text
// option three - text

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { chaptersTable } from "./chapters";

export const questionsTable = sqliteTable("questions", {
  id: integer("id").primaryKey(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  optionOne: text("option_one").notNull(),
  optionTwo: text("option_two").notNull(),
  optionThree: text("option_three").notNull(),
  chapterId: integer("chapter_id")
    .notNull()
    .references(() => chaptersTable.id, { onDelete: "cascade" }),
});

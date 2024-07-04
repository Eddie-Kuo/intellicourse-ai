// id - integer - primary key auto increment
// chapter number - number
// title - text
// youtube video id - text
// youtube video summary - text
// unitId <> units.id

import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { unitsTable } from "./units";

export const chaptersTable = sqliteTable("chapters", {
  id: integer("id").primaryKey(),
  chapter: integer("chapter").notNull(),
  title: text("title").notNull(),
  ytVideoId: text("yt_video_id").notNull(),
  ytVideoSummary: text("yt_video_summary").notNull(),
  unitId: integer("unit_id")
    .notNull()
    .references(() => unitsTable.id, { onDelete: "cascade" }),
});

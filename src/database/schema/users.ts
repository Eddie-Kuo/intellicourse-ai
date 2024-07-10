// id - integer - primary key auto increment
// first name - text
// last name - text
// email - text
// clerk user id - text
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").unique().notNull(),
  clerkUserId: text("clerk_user_id").unique().notNull(),
});

export type InsertUser = typeof users.$inferInsert;

import { db } from "..";
import { InsertUser, users } from "../schema/users";

export async function createUser(data: InsertUser) {
  await db.insert(users).values(data);
}

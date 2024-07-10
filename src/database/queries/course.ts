import { eq } from "drizzle-orm";
import { db } from "..";
import { courses } from "../schema/courses";

export async function getCourseList(userId: string) {
  const result = await db
    .select()
    .from(courses)
    .where(eq(courses.userId, userId));

  return result;
}

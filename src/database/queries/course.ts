import { eq } from "drizzle-orm";
import { db } from "..";
import { courses } from "../schema/courses";
import { units } from "../schema/units";

export async function getCourseList(userId: string) {
  const result = await db
    .select()
    .from(courses)
    .where(eq(courses.userId, userId));

  return result;
}

// fetching the unit list for the selected course
export async function getCourseDetails(courseId: string) {
  const courseIdToNumber = parseInt(courseId);

  const result = db
    .select()
    .from(units)
    .where(eq(units.courseId, courseIdToNumber));

  return result;
}

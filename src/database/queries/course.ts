import { eq } from "drizzle-orm";
import { db } from "..";
import { courses } from "@/database/schema/courses";

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

  const result = await db.query.courses.findFirst({
    where: eq(courses.id, courseIdToNumber),
    with: {
      units: {
        with: {
          chapters: true,
        },
      },
    },
  });

  return result;
}

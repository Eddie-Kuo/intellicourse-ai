import { db } from "@/database";
import { getCourseDetails } from "@/database/queries/course";
import { courses } from "@/database/schema/courses";
import { eq } from "drizzle-orm";
import React from "react";
import CourseSideBar from "@/components/CourseSideBar";

type PageProps = {
  params: {
    slug: string[];
  };
};

export default async function Page({ params: { slug } }: PageProps) {
  const [courseId] = slug;

  const courseUnits = await getCourseDetails(courseId);

  console.log(courseUnits);

  return (
    <div>
      Course: {courseId}
      <CourseSideBar courseUnits={courseUnits} />
    </div>
  );
}

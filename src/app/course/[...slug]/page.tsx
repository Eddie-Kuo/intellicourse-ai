import { db } from "@/database";
import { getCourseDetails } from "@/database/queries/course";
import { courses } from "@/database/schema/courses";
import { eq } from "drizzle-orm";
import React from "react";

type PageProps = {
  params: {
    slug: string[];
  };
};

export default async function Page({ params: { slug } }: PageProps) {
  const [courseId] = slug;

  const course = await getCourseDetails(courseId);

  console.log(course);

  return <div>Course: {courseId}</div>;
}

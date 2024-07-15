import React from "react";
import { getCourseDetails } from "@/database/queries/course";
import CourseSideBar from "@/components/CourseSideBar";

type PageProps = {
  params: {
    slug: string[];
  };
};

export default async function Page({ params: { slug } }: PageProps) {
  const [courseId] = slug;

  const courseDetails = await getCourseDetails(courseId);

  return (
    <div>
      Course: {courseId}
      <CourseSideBar course={courseDetails} />
    </div>
  );
}

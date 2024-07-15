import React from "react";
import { getCourseDetails } from "@/database/queries/course";
import CourseSideBar from "@/components/CourseSideBar";
import { redirect } from "next/navigation";

type PageProps = {
  params: {
    slug: string[];
  };
};

export default async function Page({ params: { slug } }: PageProps) {
  const [courseId] = slug;

  const courseDetails = await getCourseDetails(courseId);

  if (!courseDetails) {
    console.log("Error: Unable to fetch course details");
    redirect("/dashboard");
  }

  return (
    <div className="h-screen bg-zinc-100">
      Course: {courseId}
      <CourseSideBar courseDetails={courseDetails} />
    </div>
  );
}

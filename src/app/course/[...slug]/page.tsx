import React from "react";
import CourseSideBar from "@/components/CourseSideBar";
import VideoSummary from "@/components/VideoSummary";
import Quiz from "@/components/Quiz";
import { Course } from "@/types/course";

type PageProps = {
  params: {
    slug: string[];
  };
};

export default async function Page({ params: { slug } }: PageProps) {
  const [courseId, unitIndexParam, chapterIndexParam] = slug;

  const courseDetails: Course = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/course/${courseId}`,
  )
    .then((res) => res.json())
    .catch((error) => {
      throw new Error("Error getting course by course ID", error);
    });

  const unitIndex = parseInt(unitIndexParam);
  const chapterIndex = parseInt(chapterIndexParam);

  const unit = courseDetails.units[unitIndex];
  const chapter = unit.chapters[chapterIndex];

  return (
    <div className="flex h-screen gap-5 py-8 pr-10">
      <aside>
        <CourseSideBar
          courseDetails={courseDetails}
          currentChapter={chapter.id}
        />
      </aside>

      <VideoSummary
        chapter={chapter}
        unitIndex={unitIndex}
        chapterIndex={chapterIndex}
      />
      <Quiz questions={chapter.questions} />
    </div>
  );
}

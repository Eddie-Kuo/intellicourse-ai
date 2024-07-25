import React from "react";
import { getCourseDetails } from "@/database/queries/course";
import CourseSideBar from "@/components/CourseSideBar";
import { redirect } from "next/navigation";
import VideoSummary from "@/components/VideoSummary";
import Quiz from "@/components/Quiz";

type PageProps = {
  params: {
    slug: string[];
  };
};

export default async function Page({ params: { slug } }: PageProps) {
  const [courseId, unitIndexParam, chapterIndexParam] = slug;

  const courseDetails = await getCourseDetails(courseId);

  if (!courseDetails) {
    console.log("Error: Unable to fetch course details");
    redirect("/dashboard");
  }

  const unitIndex = parseInt(unitIndexParam);
  const chapterIndex = parseInt(chapterIndexParam);

  // find target unit and chapter from params to pass into sidebar as state to show current chapter.
  //todo: refactor to be more efficient. current problem is units and chapters don't populate database in order
  const unit = courseDetails.units.find((unit) => unit.unit === unitIndex);
  if (!unit) {
    redirect("/dashboard");
  }

  const chapter = unit.chapters.find(
    (chapter) => chapter.chapter === chapterIndex,
  );
  if (!chapter) {
    redirect("/dashboard");
  }

  return (
    <div className="flex gap-5 bg-zinc-100 py-32 pr-10">
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
      <Quiz chapter={chapter} />
    </div>
  );
}

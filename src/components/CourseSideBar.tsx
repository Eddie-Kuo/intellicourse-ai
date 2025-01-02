import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Course } from "@/types/course";

interface CourseSideBarProps {
  courseDetails: Course;
  currentChapter: string;
}

export default function CourseSideBar({
  courseDetails,
  currentChapter,
}: CourseSideBarProps) {
  return (
    <div className="flex max-w-sm flex-col justify-center gap-5 rounded-r-3xl bg-zinc-300 p-6 sm:mt-0">
      <h1 className="text-center text-3xl font-semibold uppercase text-slate-800">
        {courseDetails.title}
      </h1>
      <div className="w-[90%] self-center border border-black/60" />
      {courseDetails.units.map((unit, unitIndex) => {
        return (
          <div key={unit.id}>
            <h2 className="text-lg font-semibold text-sky-800">{unit.title}</h2>
            {unit.chapters.map((chapter, chapterIndex) => {
              return (
                <div
                  key={chapter.id}
                  className={cn(
                    "mt-1 rounded-md bg-zinc-400 px-2 py-1",
                    chapter.id === currentChapter && "bg-sky-400",
                  )}
                >
                  <Link
                    href={`/course/${courseDetails.id}/${unitIndex}/${chapterIndex}`}
                    className={cn(
                      "font-medium text-darkText",
                      chapter.id === currentChapter && "text-white",
                    )}
                  >
                    {chapter.title}
                  </Link>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}

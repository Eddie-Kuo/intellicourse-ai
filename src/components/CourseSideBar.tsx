import React from "react";
import { SelectUnit } from "@/database/schema/units";
import { SelectCourse } from "@/database/schema/courses";
import { SelectChapter } from "@/database/schema/chapters";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface CourseSideBarProps {
  courseDetails: SelectCourse & {
    units: (SelectUnit & {
      chapters: SelectChapter[];
    })[];
  };
  currentChapter: number;
}

export default function CourseSideBar({
  courseDetails,
  currentChapter,
}: CourseSideBarProps) {
  const sortedUnits = courseDetails.units.sort((a, b) => a.unit - b.unit);

  return (
    <div className="fixed flex h-full max-w-md flex-col justify-center gap-5 rounded-r-3xl bg-zinc-200 p-6 sm:mt-0">
      <h1 className="text-3xl font-semibold uppercase text-slate-800">
        {courseDetails.title}
      </h1>
      <div className="w-[90%] self-center border border-black/60" />
      {sortedUnits.map((unit) => {
        return (
          <div key={unit.unit}>
            <h2 className="text-lg font-semibold text-sky-800 ">
              {unit.title}
            </h2>
            {unit.chapters
              .sort((a, b) => a.chapter - b.chapter)
              .map((chapter) => {
                return (
                  <div
                    key={chapter.chapter}
                    className={cn(
                      "mt-1 rounded-md bg-zinc-300 px-2 py-1",
                      chapter.id === currentChapter && "bg-sky-400",
                    )}
                  >
                    <Link
                      href={`/course/${courseDetails.id}/${unit.unit}/${chapter.chapter}`}
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

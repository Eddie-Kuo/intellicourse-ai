import React from "react";
import { SelectUnit } from "@/database/schema/units";
import { SelectCourse } from "@/database/schema/courses";
import { SelectChapter } from "@/database/schema/chapters";

interface CourseSideBarProps {
  courseDetails: SelectCourse & {
    units: (SelectUnit & {
      chapters: SelectChapter[];
    })[];
  };
}

export default function CourseSideBar({ courseDetails }: CourseSideBarProps) {
  console.log("Course details", courseDetails.units);

  const sortedUnits = courseDetails.units.sort((a, b) => a.unit - b.unit);

  return (
    <div className="fixed flex h-full max-w-md flex-col justify-center rounded-r-3xl bg-zinc-200 p-6 sm:mt-0">
      <h1 className="text-darkText text-3xl font-semibold uppercase">
        {courseDetails.title}
      </h1>
      {sortedUnits.map((unit) => {
        return (
          <div key={unit.unit}>
            <h2 className="text-darkText text-lg font-semibold">
              {unit.title}
            </h2>
            {unit.chapters
              .sort((a, b) => a.chapter - b.chapter)
              .map((chapter) => {
                return (
                  <div key={chapter.chapter} className="text-darkText">
                    {chapter.title}
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
}

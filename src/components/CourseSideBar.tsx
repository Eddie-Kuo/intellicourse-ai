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
    <div className="bg-secondary fixed flex h-full max-w-md flex-col justify-center rounded-r-3xl p-6 sm:mt-0">
      <h1 className="text-darkText text-3xl font-semibold uppercase">{}</h1>
      {sortedUnits.map((unit, unitIndex) => {
        return (
          <div key={unitIndex}>
            <h2 className="text-lg font-semibold">{unit.title}</h2>
          </div>
        );
      })}
    </div>
  );
}

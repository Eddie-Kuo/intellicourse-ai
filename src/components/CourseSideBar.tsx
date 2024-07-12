import React from "react";
import { SelectUnit } from "@/database/schema/units";

type CourseSideBarProps = {
  courseUnits: SelectUnit[];
};

export default function CourseSideBar({ courseUnits }: CourseSideBarProps) {
  return (
    <div>
      {courseUnits.length > 0 &&
        courseUnits.map((unit, i) => <div key={unit.id}>{unit.title}</div>)}
    </div>
  );
}

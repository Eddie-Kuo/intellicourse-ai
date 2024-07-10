import React from "react";

type CourseProps = {
  title: string;
  id: number;
};

export default function CourseCard({ title, id }: CourseProps) {
  return <div>{title}</div>;
}

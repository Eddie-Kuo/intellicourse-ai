import Link from "next/link";
import React from "react";

type CourseCardProps = {
  title: string;
  id: string;
};

export default function CourseCard({ title, id }: CourseCardProps) {
  return (
    <Link
      href={`/course/${id}/0/0`}
      className="m-2 mx-auto flex h-32 w-44 items-center justify-center rounded-md border border-black/20 bg-slate-200 p-5 shadow-lg hover:border-black/50"
    >
      <p className="text-center text-zinc-800">{title}</p>
    </Link>
  );
}

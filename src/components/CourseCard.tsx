import Link from "next/link";
import React from "react";

type CourseCardProps = {
  title: string;
  id: number;
};

export default function CourseCard({ title, id }: CourseCardProps) {
  return (
    <Link
      href={`/course/${id}`}
      className="flex h-36 w-36 items-center justify-center rounded-md border border-black/20 bg-slate-200 p-5 shadow-lg hover:border-black/50"
    >
      <p className="text-zinc-800">{title}</p>
    </Link>
  );
}

import { FaSquarePlus } from "react-icons/fa6";
import Link from "next/link";
import CourseCard from "@/components/CourseCard";

interface Course {
  id: string;
  title: string;
}

export default async function Page() {
  const courseList: Course[] = await fetch(
    `${process.env.BACKEND_API_URL}/course`,
    {
      cache: "no-cache",
    },
  )
    .then((res) => res.json())
    .catch((error) => {
      throw new Error("Failed to fetch course list", error);
    });

  return (
    <div className="h-full min-h-screen bg-gradient-to-r from-zinc-200 to-slate-300">
      <div className="container relative mx-auto">
        {/* Content Container*/}
        <div className="py-20 md:px-10">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-3xl font-bold text-zinc-800">Your Courses</h2>
            <p className="text-zinc-800">
              Start by generating a new course or resuming where you left off!
            </p>
            <Link
              href="/create"
              className="flex items-center gap-3 rounded-xl p-5 shadow-2xl ring-1 ring-slate-400"
            >
              <FaSquarePlus color={"lightGrey"} size={30} />
              <p className="text-semibold text-zinc-800">Create a Course</p>
            </Link>
            <div className="gap-3 py-10 sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {courseList.length > 0 &&
                courseList.map((course) => (
                  <CourseCard
                    key={course.id}
                    title={course.title}
                    id={course.id}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

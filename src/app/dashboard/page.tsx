import React from "react";
import { FaSquarePlus } from "react-icons/fa6";
import Link from "next/link";

function Page() {
  return (
    <div className="flex h-screen bg-zinc-100">
      {/* Content Container*/}
      <div className="mx-auto w-full p-20">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-3xl font-bold text-zinc-800">Your Courses</h2>
          <p className="text-zinc-800">
            Start by generating a new course or resuming where you left off!
          </p>
          <Link
            href="/course/create"
            className="flex items-center gap-3 rounded-xl border-2 border-zinc-200 p-5 shadow-2xl"
          >
            <FaSquarePlus color={"lightGrey"} size={30} />
            <p className="text-semibold text-zinc-800">Create a Course</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Page;

"use client";

import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { redirect } from "next/navigation";
import { useState } from "react";

enum Status {
  loading = "loading",
  success = "success",
  error = "error",
}

export default function Page() {
  const [topic, setTopic] = useState("");
  const { user } = useUser();
  const [status, setStatus] = useState<Status>();

  const handleGenerateCourse = async () => {
    setStatus(Status.loading);

    try {
      setTopic("");
      await axios.post("/api/course/createCourse", {
        topic: topic,
        userId: user!.id,
      });
      setStatus(Status.success);
    } catch (error) {
      console.log("Error encountered with generating course. Please try again");
      setStatus(Status.error);
    }
  };

  if (status === Status.error) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-100">
        <p className="text-darkText">
          Oops, something went wrong. Please navigate back to dashboard and try
          again. Sorry for the inconvenience!
        </p>
      </div>
    );
  }

  if (status === Status.loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-100">
        <Loader />
      </div>
    );
  }

  if (status === Status.success) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen w-full flex-col items-center bg-zinc-100 pt-32">
      <div className="flex flex-col justify-center gap-3">
        <p className="text-zinc-800">Course creation page</p>
        <p className="text-zinc-800">&quot;Text about what to do&quot;</p>
        <div className="flex gap-3">
          <input
            onChange={(e) => setTopic(e.target.value)}
            value={topic}
            placeholder="enter topic"
            className="rounded-lg bg-gray-300 px-4 py-2 text-zinc-800"
          />
          <button
            onClick={handleGenerateCourse}
            className="rounded-lg bg-sky-300 p-2"
          >
            <p className="font-semibold text-zinc-800">Generate</p>
          </button>
        </div>
      </div>
    </div>
  );
}

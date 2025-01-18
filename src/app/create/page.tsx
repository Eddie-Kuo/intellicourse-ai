"use client";

import Loader from "@/components/Loader";
import { useState } from "react";
import { navigate } from "../actions/navigate";

enum Status {
  loading = "loading",
  success = "success",
  error = "error",
}

type GeneratedCourse = Record<string, string>;

export default function Page() {
  const [topic, setTopic] = useState("");
  const [status, setStatus] = useState<Status>();

  const handleGenerateCourse = async () => {
    setStatus(Status.loading);

    try {
      setTopic("");
      const response: GeneratedCourse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/course`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic: topic }),
        },
      ).then((res) => res.json());

      // navigate is a server function because we are in a client component
      navigate(`course/${response.courseId}/0/0`);
    } catch (error) {
      console.log("Error encountered with generating course:", error);
      setStatus(Status.error);
    }
  };

  if (status === Status.error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>
          Oops, something went wrong. Please navigate back to dashboard and try
          again. Sorry for the inconvenience!
        </p>
      </div>
    );
  }

  if (status === Status.loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full flex-col items-center pt-32">
      <div className="flex  flex-col justify-center gap-3">
        <p className="text-lg font-semibold ">
          Enter a topic you would like to learn more about!
        </p>
        <p className="text-sm ">
          Can be in a single word format like &quot;JavaScript&quot;<br></br> or
          in a how to phrase like: &quot;How to potty train a new puppy&quot;
        </p>
        <div className="flex gap-3">
          <input
            onChange={(e) => setTopic(e.target.value)}
            value={topic}
            placeholder="enter topic"
            className="ring-slate rounded-lg  px-4 py-2  ring-1"
          />
          <button
            onClick={handleGenerateCourse}
            className="rounded-lg bg-gradient-to-br from-purple-600 to-orange-600 p-2"
          >
            <p className="font-semibold ">Generate</p>
          </button>
        </div>
      </div>
    </div>
  );
}

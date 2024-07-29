"use client";

import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { redirect } from "next/navigation";
import { useState } from "react";
import { navigate } from "../actions/navigate";

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
      await axios.post("/api/createCourse", {
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
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-zinc-200 to-slate-300">
        <p className="text-darkText">
          Oops, something went wrong. Please navigate back to dashboard and try
          again. Sorry for the inconvenience!
        </p>
      </div>
    );
  }

  if (status === Status.loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-zinc-200 to-slate-300">
        <Loader />
      </div>
    );
  }

  if (status === Status.success) {
    navigate("dashboard");
  }

  return (
    <div className="flex h-screen w-full flex-col items-center bg-gradient-to-r from-zinc-200 to-slate-300 pt-32">
      <div className="flex  flex-col justify-center gap-3">
        <p className="text-lg font-semibold text-zinc-800">
          Enter a topic you would like to learn more about!
        </p>
        <p className="text-sm text-zinc-600">
          Can be in a single word format like &quot;JavaScript&quot;<br></br> or
          in a how to phrase like: &quot;How to potty train a new puppy&quot;
        </p>
        <div className="flex gap-3">
          <input
            onChange={(e) => setTopic(e.target.value)}
            value={topic}
            placeholder="enter topic"
            className="ring-slate rounded-lg bg-gray-300 px-4 py-2 text-zinc-800 ring-1"
          />
          <button
            onClick={handleGenerateCourse}
            className="rounded-lg bg-gradient-to-br from-purple-600 to-orange-600 p-2"
          >
            <p className="font-semibold text-white">Generate</p>
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useState } from "react";

export default function Page() {
  const [topic, setTopic] = useState("");
  const { user } = useUser();

  const handleGenerateCourse = async () => {
    const response = await axios.post("/api/course/createCourse", {
      topic: topic,
      userId: user!.id,
    });

    setTopic("");

    return response.data;
  };

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

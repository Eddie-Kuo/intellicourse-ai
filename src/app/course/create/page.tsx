import React from "react";

function Page() {
  return (
    <div className="flex h-screen w-full flex-col items-center bg-zinc-100 pt-32">
      <div className="flex flex-col justify-center gap-3">
        <p className="text-zinc-800">Course creation page</p>
        <p className="text-zinc-800">&quot;Text about what to do&quot;</p>
        <input
          placeholder="enter topic"
          className="rounded-lg bg-gray-300 px-4 py-2"
        />
      </div>
    </div>
  );
}

export default Page;

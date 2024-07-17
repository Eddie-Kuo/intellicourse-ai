"use client";

import { SelectChapter } from "@/database/schema/chapters";
import React, { useState } from "react";
import { Button } from "./ui/button";

type QuizProps = {
  chapter: SelectChapter;
};

export default function Quiz({ chapter }: QuizProps) {
  return (
    <div className="ml-8 mt-52 flex-[1]">
      <h1 className="text-lg font-semibold">Concept Check</h1>

      <div>
        <h1 className="font-semibold">{chapter.question}</h1>
        <div className="py-2"></div>
      </div>
      {chapter.question !== "No question for this chapter!" && (
        <Button onClick={() => {}} className="mt-2 w-full">
          Check Answer
        </Button>
      )}
    </div>
  );
}

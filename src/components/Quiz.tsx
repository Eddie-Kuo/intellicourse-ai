import { SelectChapter } from "@/database/schema/chapters";
import React from "react";

type QuizProps = {
  chapter: SelectChapter;
};

export default function Quiz({ chapter }: QuizProps) {
  return <div className="text-darkText">{chapter.title}</div>;
}

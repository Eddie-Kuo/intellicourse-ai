"use client";

import { SelectChapter } from "@/database/schema/chapters";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

type QuizProps = {
  chapter: SelectChapter;
};

export default function Quiz({ chapter }: QuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [questionState, setQuestionState] = useState<boolean | null>();

  //todo: need to randomize answer since the correct answer choice is always the first option
  const answerChoices = [
    chapter.answer,
    chapter.optionOne,
    chapter.optionTwo,
    chapter.optionThree,
  ];

  const checkAnswer = () => {
    if (selectedAnswer === chapter.answer) {
      setQuestionState(true);
    } else {
      setQuestionState(false);
    }
  };

  return (
    <div className="ml-8 mt-52 flex-[1]">
      <h1 className="text-lg font-semibold">Concept Check</h1>

      <div>
        <h1 className="font-semibold">{chapter.question}</h1>

        {chapter.question !== "No question for this chapter!" && (
          <>
            <div
              className={cn(
                "mt-3 rounded-md border border-zinc-400 bg-zinc-500/40 p-4",
                questionState === false && "bg-red-500",
                questionState === true && "bg-green-500",
              )}
            >
              <RadioGroup
                onValueChange={(e) => {
                  setSelectedAnswer(e);
                }}
              >
                {answerChoices.map((option, index) => {
                  return (
                    <div key={index} className="flex gap-2">
                      <RadioGroupItem value={option} id={index.toString()} />
                      <Label htmlFor="option">{option}</Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
            <Button onClick={checkAnswer} className="mt-2 w-full">
              Check Answer
            </Button>
          </>
        )}
        {questionState === false && (
          <Button
            onClick={() => setQuestionState(null)}
            variant="destructive"
            className="mt-2 w-full"
          >
            Try Again
          </Button>
        )}
      </div>
    </div>
  );
}

"use client";

import { SelectChapter } from "@/database/schema/chapters";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";

interface QuizProps {
  questions: {
    id: string;
    chapterId: string;
    question: string;
    answer: string;
    options: string;
  }[];
}

export default function Quiz({ questions }: QuizProps) {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [questionState, setQuestionState] = useState<boolean | null>();

  // Todo: Refactor backend logic - only one question is generated per chapter
  const question = questions[0];

  const checkAnswer = () => {
    if (selectedAnswer === question.answer) {
      setQuestionState(true);
    } else {
      setQuestionState(false);
    }
  };

  const options: string[] = JSON.parse(question.options);

  return (
    <div className="ml-8 flex-1">
      <h1 className="text-lg font-semibold">Concept Check</h1>

      <div>
        <h1 className="font-semibold">{question.question}</h1>

        {question.question && (
          <>
            <div
              className={cn(
                "mt-3 rounded-md border  p-4",
                questionState === false && "bg-red-500",
                questionState === true && "bg-green-500",
              )}
            >
              <RadioGroup
                onValueChange={(e) => {
                  setSelectedAnswer(e);
                }}
              >
                {options.map((option, index) => {
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

import { db } from "@/database";
import { chapters } from "@/database/schema/chapters";
import { courses } from "@/database/schema/courses";
import { units } from "@/database/schema/units";
import { generateSummary, gpt } from "@/lib/gpt";
import createCourseSchema from "@/lib/validations/course";
import {
  getQuestionsFromTranscript,
  getYoutubeVideoId,
  getYoutubeVideoTranscript,
} from "@/lib/youtube";
interface courseOutput {
  title: string;
  units: {
    title: string;
    chapters: {
      chapter_title: string;
      youtube_search_query: string;
    }[];
  }[];
}

export const maxDuration = 60;
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const { ...body } = await request.json();
  const { topic, userId } = createCourseSchema.parse(body);

  try {
    const generated_course = await generateCourse(topic);
    console.log("GENERATED COURSE", generated_course);

    const courseId = await insertCourse(generated_course.title, userId);
    await processUnits(generated_course.units, courseId);

    return Response.json({ generatedCourseId: courseId });
  } catch (error) {
    console.error("Error with generating course", error);
    return handleError(error);
  }
}

async function generateCourse(topic: string): Promise<courseOutput> {
  return await gpt(
    "You are an AI capable of curating comprehensive course content, coming up with relevant chapter titles, and finding relevant youtube videos for each chapter",
    `It is your job to create a detailed course roadmap about ${topic}. Create units for all the major topics about ${topic}. Then, for each unit, create a list of chapters breaking down the unit into more specific subtopics for the user to follow. Then, for each chapter, provide a detailed youtube search query that can be used to find an informative educational video for each chapter. Each query should give an educational informative course in youtube.`,
    {
      title: "title of the course",
      units: "title of the unit",
      chapters:
        "an array of chapters covering the important topics in the unit. Each chapter with a relevant youtube_search_query and a chapter_title key in the JSON object. Be very specific on the material covered in each chapter.",
    },
  );
}

async function insertCourse(title: string, userId: string): Promise<number> {
  const courseId = await db
    .insert(courses)
    .values({
      title: title,
      userId: userId,
    })
    .returning({ insertedCourse: courses.id });

  return courseId[0].insertedCourse;
}

async function processUnits(units: courseOutput["units"], courseId: number) {
  const unitPromises = units.map((unit, i) => processUnit(unit, i, courseId));
  await Promise.all(unitPromises);
}

async function processUnit(
  unit: courseOutput["units"][0],
  index: number,
  courseId: number,
) {
  const unitId = await db
    .insert(units)
    .values({
      unit: index + 1,
      title: unit.title,
      courseId: courseId,
    })
    .returning({ insertedUnit: units.id });

  const chapterPromises = unit.chapters.map((chapter, j) =>
    processChapter(chapter, j, unitId[0].insertedUnit),
  );
  await Promise.all(chapterPromises);
}

async function processChapter(
  chapter: courseOutput["units"][0]["chapters"][0],
  index: number,
  unitId: number,
) {
  try {
    const videoId = await getYoutubeVideoId(chapter.youtube_search_query);
    let transcript = await getYoutubeVideoTranscript(
      videoId.items[0].id.videoId,
    );
    let summary = await generateSummaryFromTranscript(transcript);

    const question = await getQuestionsFromTranscript(
      summary,
      chapter.chapter_title,
    );

    await db.insert(chapters).values({
      chapter: index + 1,
      title: chapter.chapter_title,
      ytVideoId: videoId.items[0].id.videoId,
      ytVideoSummary: summary,
      question: question.question,
      answer: question.answer,
      optionOne: question.optionOne,
      optionTwo: question.optionTwo,
      optionThree: question.optionThree,
      unitId: unitId,
    });
  } catch (error) {
    console.error(`Error processing chapter ${index + 1}`, error);
    throw error;
  }
}

async function generateSummaryFromTranscript(
  transcript: string,
): Promise<string> {
  if (transcript.length) {
    // let maxLength = 500;
    // transcript = transcript.split(" ").slice(0, maxLength).join(" ");
    return await generateSummary(
      "You are an AI capable of summarizing a youtube transcript",
      `Summarize the following video transcript in 250 words or less: ${transcript}. Do not talk about the sponsors, anything unrelated to the main topic, or introduce what the summary is about.`,
    );
  } else {
    return "No available summary for this video!";
  }
}

function handleError(error: unknown): Response {
  if (error instanceof Error) {
    return new Response(error.message, { status: 500 });
  }
  return new Response("Error with generating course", { status: 500 });
}

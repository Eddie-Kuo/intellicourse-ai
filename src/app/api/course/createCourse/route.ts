import { FIRESTORE_DB } from "@/firebaseConfig";
import { strict_output } from "@/lib/gpt";
import createCourseSchema from "@/lib/validations/course";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  const { ...body } = await request.json();
  const { topic, userId } = createCourseSchema.parse(body);

  try {
    let generated_course: courseOutput = await strict_output(
      "You are an AI capable of curating comprehensive course content, coming up with relevant chapter titles, and finding relevant youtube videos for each chapter",
      `It is your job to create a detailed course roadmap about ${topic}. Create units for all the major topics about ${topic}. Then, for each unit, create a list of chapters breaking down the unit into more specific subtopics for the user to follow. Then, for each chapter, provide a detailed youtube search query that can be used to find an informative educational video for each chapter. Each query should give an educational informative course in youtube.`,
      {
        title: "title of the course",
        units: "title of the unit",
        chapters:
          "an array of chapters covering the important topics in the unit. Each chapter with a relevant youtube_search_query and a chapter_title key in the JSON object. Be very specific on the material covered in each chapter.",
      },
    );

    console.log("GENERATED COURSE", generated_course);

    // add course to database
    const courseDoc = await addDoc(
      collection(FIRESTORE_DB, `users/${userId}/courses`),
      {
        title: generated_course.title,
        createdAt: serverTimestamp(),
      },
    );

    // map and add chapters
    for (const unit of generated_course.units) {
      await addDoc(
        collection(
          FIRESTORE_DB,
          `users/${userId}/courses/${courseDoc.id}/units`,
        ),
        {
          unit_title: unit.title,
          chapters: unit.chapters,
        },
      );
    }

    return NextResponse.json({ courseId: courseDoc.id });
  } catch (error) {
    return new NextResponse("Error with generating course", { status: 400 });
  }
}

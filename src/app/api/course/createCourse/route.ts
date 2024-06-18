import { FIRESTORE_DB } from "@/firebaseConfig";
import { generateSummary, strict_output } from "@/lib/gpt";
import createCourseSchema from "@/lib/validations/course";
import { getQuestionsFromTranscript, getYoutubeVideoId, getYoutubeVideoTranscript } from "@/lib/youtube";
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
  const { topic , userId } = createCourseSchema.parse(body);

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

    // Traverse units and chapters to fetch additional information
    for (let i = 0; i < generated_course.units.length; i++) {
      const unit = generated_course.units[i];

      const unitId = await addDoc(
        collection(FIRESTORE_DB, `users/${userId}/courses/${courseDoc.id}/units`),
        {
          unit: i + 1,
          title: unit.title,
        },
      );

      for (let j = 0; j < unit.chapters.length; j++) {
        const chapter = unit.chapters[j];

        const videoId = await getYoutubeVideoId(chapter.youtube_search_query);

        let transcript = await getYoutubeVideoTranscript(
          videoId.items[0].id.videoId,
        );

        // we need to account for the videos having transcript disabled
        let summary;

        if (transcript.length) {
          let maxLength = 500;
          transcript = transcript?.split(" ").slice(0, maxLength).join(" ");

          // generate the summary from youtube transcript
          summary = await generateSummary(
            "You are an AI capable of summarizing a youtube transcript",
            `Summarize the following video transcript in 250 words or less: ${transcript}. Do not talk about the sponsors, anything unrelated to the main topic, or introduce what the summary is about.`,
          );
        } else {
          summary = "No available summary for this video!";
        }

        // generate the question based on the summarized transcript
        const question = await getQuestionsFromTranscript(
          summary!,
          generated_course.title,
        );

        // Populate database with chapter info
        await addDoc(
          collection(
            FIRESTORE_DB,
            `users/${userId}/courses/${courseDoc.id}/units/${unitId.id}/chapters`,
          ),
          {
            chapter: j + 1,
            chapter_title: chapter.chapter_title,
            summary: summary,
            youtube_video_id: videoId.items[0].id.videoId,
            question: question,
          },
        );
      }
    }

    return NextResponse.json({ courseId: courseDoc.id });
  } catch (error) {
    return new NextResponse("Error with generating course", { status: 400 });
  }
}

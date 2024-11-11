/**
 * This file contains functions to interact with the Youtube API
 */

import axios from "axios";
import { YoutubeTranscript } from "youtube-transcript";
import { gpt } from "./gpt";

export async function getYoutubeVideoId(searchQuery: string) {
  searchQuery = encodeURIComponent(searchQuery);

  try {
    const { data } = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_API}&q=${searchQuery}&videoDuration=medium&videoEmbeddable=true&type=video&maxResults=5`,
    );

    if (!data) {
      console.log("Youtube Search Failed!");
      return;
    }

    console.log("YouTube Video ID Retrieved:", data.items[0].id.videoId);
    return data;
  } catch (error) {
    console.error("Error fetching YouTube Video ID:", error);
    throw error;
  }
}

export async function getYoutubeVideoTranscript(videoId: string) {
  try {
    const transcriptArr = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
    });

    let transcript = "";
    for (let t of transcriptArr) {
      transcript += t.text + " ";
    }

    console.log("Transcript Retrieved for Video ID:", videoId);
    return transcript.replaceAll("\n", "");
  } catch (error) {
    console.error("Error when transcribing YouTube Video:", error);
    return "";
  }
}

export async function getQuestionsFromTranscript(
  summary: string,
  courseTitle: string,
) {
  type Question = {
    question: string;
    answer: string;
    optionOne: string;
    optionTwo: string;
    optionThree: string;
  };

  let question: Question = {
    question: "No question for this chapter!",
    answer: "",
    optionOne: "",
    optionTwo: "",
    optionThree: "",
  };

  if (!summary.length || summary === "No available summary for this video!") {
    return question;
  }

  question = await gpt(
    "You are a helpful AI that is able to generate mcq questions and answers. The length of each answer should not be more than 15 words",

    `You are to generate a random hard mcq question about ${courseTitle} with context of the following transcript: ${summary}.`,

    {
      question: "question",
      answer: "answer with max length of 15 words",
      optionOne: "option 1 with max length of 15 words that is not the answer",
      optionTwo: "option 2 with max length of 15 words that is not the answer",
      optionThree:
        "option 3 with max length of 15 words that is not the answer",
    },
  );

  return question;
}

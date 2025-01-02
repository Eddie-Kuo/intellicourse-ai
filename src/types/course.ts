export interface Course {
  id: string;
  title: string;
  units: {
    id: string;
    title: string;
    courseId: string;
    chapters: {
      id: string;
      unitId: string;
      title: string;
      videoId: string;
      youtubeSearchQuery: string;
      summary: string;
      questions: {
        id: string;
        chapterId: string;
        question: string;
        answer: string;
        options: string;
      }[];
    }[];
  }[];
}

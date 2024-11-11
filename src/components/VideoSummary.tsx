import { SelectChapter } from "@/database/schema/chapters";

type VideoSummary = {
  chapter: SelectChapter;
  unitIndex: number;
  chapterIndex: number;
};

function VideoSummary({ chapter, unitIndex, chapterIndex }: VideoSummary) {
  return (
    <div className="flex-[3]">
      <div className="flex items-center gap-2">
        <h4 className=" text-xl">
          Unit {unitIndex} - Chapter {chapterIndex}:
        </h4>
        <h1 className=" text-xl  font-semibold tracking-wide">
          {chapter.title}
        </h1>
      </div>
      <iframe
        title="chapter video"
        className="mt-4 aspect-video max-h-[24rem] w-full"
        src={`https://www.youtube.com/embed/${chapter.ytVideoId}`}
        allowFullScreen
      />
      <div className="mt-4">
        <h3 className=" text-3xl font-semibold">Summary</h3>
        <p className=" mt-2">{chapter.ytVideoSummary}</p>
      </div>
    </div>
  );
}

export default VideoSummary;

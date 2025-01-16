interface VideoSummaryProps {
  chapter: {
    id: string;
    unitId: string;
    title: string;
    videoId: String;
    youtubeSearchQuery: String;
    summary: String;
    chapterNumber: number;
  };
  unitNumber: number;
}

function VideoSummary({ chapter, unitNumber }: VideoSummaryProps) {
  return (
    <div className="flex-[3]">
      <div className="flex items-center gap-2">
        <h4 className=" text-xl">
          Unit {unitNumber} - Chapter {chapter.chapterNumber}:
        </h4>
        <h1 className=" text-xl  font-semibold tracking-wide">
          {chapter.title}
        </h1>
      </div>
      <iframe
        title="chapter video"
        className="mt-4 aspect-video max-h-[24rem] w-full"
        src={`https://www.youtube.com/embed/${chapter.videoId}`}
        allowFullScreen
      />
      <div className="mt-4">
        <h3 className=" text-3xl font-semibold">Summary</h3>
        <p className=" mt-2">{chapter.summary}</p>
      </div>
    </div>
  );
}

export default VideoSummary;

import { getCourseImageUrl } from "@/app/data/admin/admin-get-course-image-url";
import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { BookIcon, CheckCircle } from "lucide-react";

interface iAppProps {
  data: LessonContentType;
}

function VideoPlayer({
  thumbnailUrl,
  videoUrl,
}: {
  thumbnailUrl: string | null;
  videoUrl: string | null;
}) {
  if (!videoUrl) {
    return (
      <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
        <BookIcon className="size-16 text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">
          This lesson does not have a video yet.
        </p>
      </div>
    );
  }

  return (
    <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
      <video
        className="w-full h-full object-cover"
        controls
        poster={thumbnailUrl ?? undefined}
      >
        <source src={videoUrl} type="video/mp4" />
        <source src={videoUrl} type="video/webm" />
        <source src={videoUrl} type="video/ogg" />
        Your browser doen&apos;t support the video tag.
      </video>
    </div>
  );
}

export async function CourseContent({ data }: iAppProps) {
  const videoUrl = data.videoKey
    ? await getCourseImageUrl(data.videoKey)
    : null;
  const thumbnailUrl = data.thumbnailKey
    ? await getCourseImageUrl(data.thumbnailKey)
    : null;

  return (
    <div className="flex flex-col h-full bg-background pl-6">
      <VideoPlayer thumbnailUrl={thumbnailUrl} videoUrl={videoUrl} />

      <div className="py-4 border-b">
        <Button
          variant="outline"
          className="bg-green-500/10 text-green-500 hover:text-green-600"
        >
          <CheckCircle className="size-4 mr-2 text-green-500" />
          Completed
        </Button>
      </div>

      <div className="space-y-3 pt-3">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {data.title}
        </h1>

        {data.description && (
          <RenderDescription json={JSON.parse(data.description)} />
        )}
      </div>
    </div>
  );
}

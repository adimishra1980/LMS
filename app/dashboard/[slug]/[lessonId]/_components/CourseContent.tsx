import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { RenderDescription } from "@/components/rich-text-editor/RenderDescription";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface iAppProps {
  data: LessonContentType;
}

export function CourseContent({ data }: iAppProps) {
  return (
    <div className="flex flex-col h-full bg-background pl-6">
      <h1>Video Player</h1>

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

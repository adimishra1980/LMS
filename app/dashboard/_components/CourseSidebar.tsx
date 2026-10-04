"use client";

import { CourseSidebarDataType } from "@/app/data/course/get-course-sidebar-data";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Progress } from "@/components/ui/progress";
import { ChevronDown, Play } from "lucide-react";
import { LessonItem } from "./LessonItems";
import { usePathname } from "next/navigation";

interface iAppProps {
  course: CourseSidebarDataType["course"];
}

export function CourseSidebar({ course }: iAppProps) {
  const pathname = usePathname();

  const currentLessonId = pathname.split("/").pop();

  return (
    <div className="flex flex-col h-full">
      <div className="pb-4 pr-4 border-b border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Play className="size-5 text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="font-semibold text-base leading-tight truncate">
              {course.title}
            </h1>
            <p className="text-xs text-muted-foreground mt-1 truncate">
              {course.category}
            </p>
          </div>
        </div>

        {/* chapters */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">4/10 lessons</span>
          </div>

          <Progress value={40} className="h-1.5 rounded-full" />
          <p className="text-xs text-muted-foreground">40% completed</p>
        </div>
      </div>

      <div className="py-4 pr-4 space-y-3">
        {course.chapters.map((chapter, index) => (
          <Collapsible key={chapter.id} defaultOpen={index === 0}>
            <CollapsibleTrigger
              render={
                <Button
                  variant="outline"
                  className="w-full p-3 h-auto flex items-center gap-2 cursor-pointer"
                >
                  <div className="shrink-0">
                    <ChevronDown className="size-4 text-primary" />
                  </div>

                  <div className="flex-1 text-left min-w-0">
                    <p className="font-semi-bold text-sm leading-tight line-clamp-1">
                      {chapter.position}: {chapter.title}
                    </p>

                    <p className="text-[10px] text-muted-foreground">
                      {chapter.lessons.length} lessons
                    </p>
                  </div>
                </Button>
              }
            />

            <CollapsibleContent className="mt-3 pl-4 border-l-2 space-y-3">
              {chapter.lessons.map((lesson) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  slug={course.slug}
                  completed={false}
                  isActive={currentLessonId === lesson.id}
                />
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}

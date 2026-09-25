import { adminGetLesson } from "@/app/data/admin/admin-get-lesson";
import React from "react";
import { LessonForm } from "./_components/LessonForm";

type Params = Promise<{
  courseId: string;
  chapterId: string;
  lessonId: string;
}>;
async function LessonIdPage({ params }: { params: Params }) {
  const { chapterId, courseId, lessonId } = await params;

  const lesson = await adminGetLesson(lessonId);

  return <LessonForm data={lesson} chapterId={chapterId} courseId={courseId} />;
}

export default LessonIdPage;

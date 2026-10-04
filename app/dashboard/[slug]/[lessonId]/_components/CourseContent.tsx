import { getCourseImageUrl } from "@/app/data/admin/admin-get-course-image-url";
import { LessonContentType } from "@/app/data/course/get-lesson-content";
import { CourseContentClient } from "./CourseContentClient";

interface iAppProps {
  data: LessonContentType;
}

export async function CourseContent({ data }: iAppProps) {
  const videoUrl = data.videoKey
    ? await getCourseImageUrl(data.videoKey)
    : null;
  const thumbnailUrl = data.thumbnailKey
    ? await getCourseImageUrl(data.thumbnailKey)
    : null;

  return (
    <CourseContentClient
      data={data}
      videoUrl={videoUrl}
      thumbnailUrl={thumbnailUrl}
    />
  );
}

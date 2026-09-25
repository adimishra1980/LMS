import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";
import { notFound } from "next/navigation";
import { getCourseImageUrl } from "./admin-get-course-image-url";

export async function adminGetLesson(id: string) {
  await requireAdmin();

  const data = await prisma.lesson.findUnique({
    where: {
      id,
    },
    select: {
      title: true,
      videoKey: true,
      thumbnailKey: true,
      description: true,
      id: true,
      position: true,
    },
  });

  if (!data) {
    return notFound();
  }

  const thumbnailUrl = data.thumbnailKey
    ? await getCourseImageUrl(data.thumbnailKey)
    : null;

  const videoUrl = data.videoKey
    ? await getCourseImageUrl(data.videoKey)
    : null;

  return { ...data, thumbnailUrl, videoUrl };
}

export type AdminLessonType = Awaited<ReturnType<typeof adminGetLesson>>;


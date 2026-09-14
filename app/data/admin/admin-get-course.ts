import "server-only";
import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";
import { notFound } from "next/navigation";
import { getCourseImageUrl } from "./admin-get-course-image-url";

export async function adminGetCourse(id: string) {
  await requireAdmin();

  const data = await prisma.course.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      title: true,
      description: true,
      fileKey: true,
      price: true,
      duration: true,
      level: true,
      status: true,
      slug: true,
      smallDescription: true,
      category: true,
    },
  });

  if (!data) {
    return notFound();
  }

  if (data.fileKey) {
    const url = await getCourseImageUrl(data.fileKey);
    return { ...data, imageUrl: url };
  }

  return data;
}
export type AdminCourseSingularType = Awaited<ReturnType<typeof adminGetCourse>>; 
import { prisma } from "@/lib/db";
import { getCourseImageUrl } from "./admin-get-course-image-url";
import { requireAdmin } from "./require-admin";

export async function adminGetCourses() {
  await requireAdmin();

  const data = await prisma.course.findMany({
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      title: true,
      smallDescription: true,
      duration: true,
      level: true,
      status: true,
      price: true,
      fileKey: true,
      slug: true,
    },
  });

  const coursesWithImageUrl = await Promise.all(
    data.map(async (course) => ({
      ...course,
      imageUrl: course.fileKey ? await getCourseImageUrl(course.fileKey) : null,
    }))
  );

  return coursesWithImageUrl;
}

export type AdminCourseType = Awaited<ReturnType<typeof adminGetCourses>>[0];

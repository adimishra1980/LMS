import "server-only";

import { prisma } from "@/lib/db";
import { requireAdmin } from "./require-admin";
import { getCourseImageUrl } from "./admin-get-course-image-url";

export async function adminGetRecentCourses() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
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
    })),
  );

  return coursesWithImageUrl;
}

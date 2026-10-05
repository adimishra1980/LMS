import "server-only";
import { requireUser } from "./require-user";
import { prisma } from "@/lib/db";
import { getCourseImageUrl } from "../admin/admin-get-course-image-url";

export async function getEnrolledCourses() {
  const user = await requireUser();

  const data = await prisma.enrollment.findMany({
    where: {
      userId: user.id,
      status: "Active",
    },
    select: {
      course: {
        select: {
          id: true,
          title: true,
          smallDescription: true,
          fileKey: true,
          level: true,
          slug: true,
          duration: true,
          chapters: {
            select: {
              id: true,
              lessons: {
                select: {
                  id: true,
                  lessonProgress: {
                    where: {
                      userId: user.id,
                    },
                    select: {
                      id: true,
                      completed: true,
                      lessonId: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const withImageUrls = await Promise.all(
    data.map(async (enrollment) => ({
      ...enrollment,
      course: {
        ...enrollment.course,
        thumbnailUrl: enrollment.course.fileKey
          ? await getCourseImageUrl(enrollment.course.fileKey)
          : null,
      },
    })),
  );

  return withImageUrls;
}

export type EnrolledCourseType = Awaited<
  ReturnType<typeof getEnrolledCourses>
>[0];

import "server-only";
import { requireUser } from "../user/require-user";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";

export async function getCourseSidebarData(slug: string) {
  const session = await requireUser();

  const course = await prisma.course.findUnique({
    where: {
      slug,
    },

    select: {
      id: true,
      title: true,
      fileKey: true,
      duration: true,
      level: true,
      category: true,
      slug: true,
      chapters: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          title: true,
          position: true,
          lessons: {
            orderBy: {
              position: "asc",
            },
            select: {
              id: true,
              title: true,
              position: true,
              description: true,
              lessonProgress: {
                where: {
                  userId: session.id,
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
  });

  if (!course) {
    notFound();
  }

  const enrollment = await prisma.enrollment.findUnique({
    where: {
      userId_courseId: {
        userId: session.id,
        courseId: course.id,
      },
    },
  });

  if (!enrollment || enrollment.status !== "Active") {
    notFound();
  }

  return {
    course,
  };
}

export type CourseSidebarDataType = Awaited<
  ReturnType<typeof getCourseSidebarData>
>;

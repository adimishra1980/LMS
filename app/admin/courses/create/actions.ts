"use server";

import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { requireAdmin } from "@/app/data/admin/require-admin";

export async function CreateCourse(
  data: CourseSchemaType,
): Promise<ApiResponse> {
  // in server actions this fnc needs to be outside the try-catch
  const session = await requireAdmin();
  
  try {
    const validation = courseSchema.safeParse(data);

    if (!validation.success) {
      return {
        status: "error",
        message: "Invalid form data",
      };
    }

    await prisma.course.create({
      data: {
        ...validation.data,
        userId: session?.user.id as string,
      },
    });

    return {
      status: "success",
      message: "Course created successfully",
    };
  } catch (error) {
    console.log(error);

    return {
      status: "error",
      message: "Failed to create course.",
    };
  }
}

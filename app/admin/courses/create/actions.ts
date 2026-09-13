"use server";

import { courseSchema, CourseSchemaType } from "@/lib/zodSchema";
import { prisma } from "@/lib/db";
import { ApiResponse } from "@/lib/types";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function CreateCourse(
  data: CourseSchemaType,
): Promise<ApiResponse> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

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

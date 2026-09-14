import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { v4 as uuidv4 } from "uuid";
import { env } from "@/lib/env";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3 } from "@/lib/S3Client";
import { requireAdmin } from "@/app/data/admin/require-admin";

const fileUploadSchema = z.object({
  fileName: z.string().min(1, { message: "Filename is required" }),
  contentType: z.string().min(1, { message: "Content type is required" }),
  size: z.number().min(1, { message: "Size is required" }),
  isImage: z.boolean(),
});

export async function POST(request: NextRequest) {
  try {
    await requireAdmin();
    const body = await request.json();

    const validation = fileUploadSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request data" },
        { status: 400 },
      );
    }

    const { fileName, contentType, size } = validation.data;

    const uniqueKey = `${uuidv4()}-${fileName}`;

    const command = new PutObjectCommand({
      Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
      ContentType: contentType,
      // ContentLength: size,
      Key: uniqueKey,
    });

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360, // expires in 6 minutes
    });

    const response = {
      presignedUrl,
      key: uniqueKey,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to generate presigned url" },
      { status: 500 },
    );
  }
}

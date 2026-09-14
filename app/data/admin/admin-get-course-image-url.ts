import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { env } from "@/lib/env";
import { S3 } from "@/lib/S3Client";

export async function getCourseImageUrl(key: string) {
  const command = new GetObjectCommand({
    Bucket: env.NEXT_PUBLIC_S3_BUCKET_NAME_IMAGES,
    Key: key,
  });

  const signedUrl = await getSignedUrl(S3, command, {
    expiresIn: 60 * 5, // for 5 minutes
  });

  return signedUrl;
}

import { randomUUID } from "crypto";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";
import { getS3ObjectUrl, s3BucketName, s3Client } from "@/lib/aws/s3";

export const runtime = "nodejs";

export async function POST(request) {
  const formData = await request.formData();
  const file = formData.get("file");

  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  if (!s3BucketName) {
    return NextResponse.json(
      { error: "AWS bucket is not configured." },
      { status: 500 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const extension = file.name?.split(".").pop() || "bin";
  const key = `uploads/${randomUUID()}.${extension}`;

  await s3Client.send(
    new PutObjectCommand({
      Bucket: s3BucketName,
      Key: key,
      Body: buffer,
      ContentType: file.type || "application/octet-stream",
    })
  );

  return NextResponse.json({
    key,
    url: getS3ObjectUrl(key),
  });
}

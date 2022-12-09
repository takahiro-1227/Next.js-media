import { s3Client } from "../libs/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadS3Base64 = async (thumbnailURL: string, fileKey: string) => {
  const thumbnailData = thumbnailURL.replace(/^data:\w+\/\w+;base64,/, "");
  const decodedThumbnail = Buffer.from(thumbnailData, "base64");

  const fileExtention = thumbnailURL.slice(
    thumbnailURL.indexOf("/") + 1,
    thumbnailURL.indexOf(";")
  );
  const contentType = thumbnailURL
    .toString()
    .slice(thumbnailURL.indexOf(":") + 1, thumbnailURL.indexOf(";"));

  const params = {
    Body: decodedThumbnail,
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: `${fileKey}.${fileExtention}`,
    ContentType: contentType,
  };

  try {
    const data = await s3Client.send(new PutObjectCommand(params));
    console.log("Success", data);
  } catch (error) {
    console.log("Error", error);
  }
};

import { toFile } from "@imagekit/nodejs";
import imageKitClient from "../config/imageKit.js";

export const uploadImageToImageKit = async (files: Express.Multer.File[]) => {
  const imgUploads = files.map(async (file) =>
    imageKitClient.files.upload({
      file: await toFile(file.buffer, file.originalname),
      fileName: file.originalname,
      useUniqueFileName: true,
    }),
  );

  const results = await Promise.allSettled(imgUploads);

  const uploaded = results
    .filter((r) => r.status === "fulfilled")
    .map((r) => (r as PromiseFulfilledResult<any>).value)
    .map((r) => ({
      url: r.url,
      name: r.name,
      fileId: r.fileId,
      originalName: r.originalname,
    }));

  const failedCount = results.filter((r) => r.status === "rejected").length;

  return {
    uploaded,
    failedCount,
  };
};

export const deleteFromImageKit = async (fileIds: string[]) => {
  await Promise.allSettled(
    fileIds.map((id) => imageKitClient.files.delete(id)),
  );
};

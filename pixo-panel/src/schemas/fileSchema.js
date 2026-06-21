import z from "zod";
import { allowedFileTypes } from "./allowedFileTypes";

export function fileSchema(fileType = "imageTypes", MAX_FILE_SIZE = 1_000_000) {
  return z
    .instanceof(File, { message: "فایلی انتخاب نشده" })
    .refine(
      (file) => !file || allowedFileTypes[fileType].includes(file.type),
      "فرمت فایل مجاز نیست",
    )
    .refine(
      (file) => !file || file.size <= MAX_FILE_SIZE,
      `حداکثر حجم فایل ${MAX_FILE_SIZE / 1_000_000} مگابایت است`,
    );
}

export function fileSchemaOptional(
  fileType = "imageTypes",
  MAX_FILE_SIZE = 1_000_000,
) {
  return z
    .any()
    .refine((value) => {
      if (!value) return true;
      if (value instanceof File) return true;
      if (value instanceof FileList && value.length === 0) return true;
      return false;
    }, "فایلی انتخاب نشده")
    .refine((value) => {
      const file = value instanceof FileList ? value[0] : value;
      if (!file) return true;
      return allowedFileTypes[fileType].includes(file.type);
    }, "فرمت فایل مجاز نیست")
    .refine(
      (value) => {
        const file = value instanceof FileList ? value[0] : value;
        if (!file) return true;
        return file.size <= MAX_FILE_SIZE;
      },
      `حداکثر حجم فایل ${MAX_FILE_SIZE / 1_000_000} مگابایت است`,
    );
}

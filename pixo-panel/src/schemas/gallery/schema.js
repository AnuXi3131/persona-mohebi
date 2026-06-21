import z from "zod";
import { fileSchema, fileSchemaOptional } from "..";

const imagesSchema = z.object({
  file: fileSchema(),
});

const videosSchemaShape = {
  title: z
    .string()
    .min(1, "عنوان ویدیو ضروری است")
    .max(300, "تعداد کاراکتر غیر مجاز"),

  thumbnail: fileSchemaOptional(),
};

const audiosSchemaShape = {
  title: z
    .string()
    .min(1, "عنوان فایل صوتی ضروری است")
    .max(300, "تعداد کاراکتر غیر مجاز"),

  thumbnail: fileSchemaOptional(),
};

const videosSchema = (mode = "create") =>
  z.object({
    ...videosSchemaShape,
    file:
      mode === "edit"
        ? fileSchemaOptional("videoTypes", 50_000_000)
        : fileSchema("videoTypes", 50_000_000),
  });

const audiosSchema = (mode = "create") =>
  z.object({
    ...audiosSchemaShape,
    file:
      mode === "edit"
        ? fileSchemaOptional("audioTypes", 10_000_000)
        : fileSchema("audioTypes", 10_000_000),
  });

export { imagesSchema, videosSchema, audiosSchema };

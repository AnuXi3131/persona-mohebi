import { z } from "zod";
import { fileSchema, fileSchemaOptional } from "..";

const baseFields = {
  title: z
    .string()
    .min(1, "عنوان مقاله ضروری است")
    .max(300, "تعداد کاراکتر غیر مجاز"),

  description: z
    .string()
    .min(1, "خلاصه مقاله ضروری است")
    .max(200, "تعداد کاراکتر غیر مجاز"),

  content: z
    .string()
    .min(1, "محتوا مقاله ضروری است")
    .max(30000, "تعداد کاراکتر غیر مجاز"),
};

const blogSchema = (mode = "create") =>
  z.object({
    ...baseFields,
    file: mode === "edit" ? fileSchemaOptional() : fileSchema(),
  });

export { blogSchema };

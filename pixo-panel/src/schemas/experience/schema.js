import { z } from "zod";
import { fileSchema, fileSchemaOptional } from "..";

const baseFields = {
  title: z
    .string()
    .min(1, "عنوان سابقه ضروری است")
    .max(300, "تعداد کاراکتر غیر مجاز"),

  description: z
    .string()
    .min(1, "توضیحات ضروری است")
    .max(1000, "تعداد کاراکتر غیر مجاز"),

  options: z
    .string()
    .min(1, "مسئولیت ها ضروری است")
    .max(2000, "تعداد کاراکتر غیر مجاز"),
};

const experienceSchema = (mode = "create") =>
  z.object({
    ...baseFields,
    file: mode === "edit" ? fileSchemaOptional() : fileSchema(),
  });

export { experienceSchema };

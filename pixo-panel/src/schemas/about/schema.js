import { z } from "zod";
import { fileSchema } from "..";

const aboutSchema = z.object({
  title: z.string().max(100, "تعداد کاراکتر غیر مجاز"),

  description: z
    .string()
    .min(1, "متن بیوگرافی ضروری است")
    .max(5000, "تعداد کاراکتر غیر مجاز"),
});

const skillsSchema = z.object({
  title: z.string().max(100, "تعداد کاراکتر غیر مجاز"),
  file: fileSchema(),
});

export { aboutSchema, skillsSchema };

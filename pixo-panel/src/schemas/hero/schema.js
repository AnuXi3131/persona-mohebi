import { z } from "zod";
import { fileSchemaOptional } from "..";

const heroSchema = z.object({
  title: z.string().max(100, "تعداد کاراکتر غیر مجاز").optional(),

  jobs: z
    .string()
    .min(1, "حوزه های فعالیت ضروری است")
    .max(300, "تعداد کاراکتر غیر مجاز"),

  file: fileSchemaOptional("imageTypes", 5_000_000),
});

export { heroSchema };

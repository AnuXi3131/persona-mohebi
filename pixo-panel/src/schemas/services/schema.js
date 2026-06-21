import { z } from "zod";
import { fileSchema, fileSchemaOptional } from "..";

const baseFields = {
  title: z
    .string()
    .min(1, "عنوان سرویس ضروری است")
    .max(300, "تعداد کاراکتر غیر مجاز"),

  options: z
    .string()
    .min(1, "آپشن ضروری است")
    .max(3000, "تعداد کاراکتر غیر مجاز"),

  price: z
    .string()
    .min(1, "هزینه سرویس ضروری است")
    .max(100, "تعداد کاراکتر غیر مجاز")
    .refine((val) => /^[0-9]+$/.test(val), "فقط عدد مجاز است"),

  order_text: z.string().max(200, "تعداد کاراکتر غیر مجاز"),

  order_link: z
    .string()
    .min(1, "لینک اکشن باتن ضروری است")
    .max(1000, "تعداد کاراکتر غیر مجاز")
    .url("لینک معتبر نیست"),
};

const servicesSchema = (mode = "create") =>
  z.object({
    ...baseFields,
    file: mode === "edit" ? fileSchemaOptional() : fileSchema(),
  });

export { servicesSchema };

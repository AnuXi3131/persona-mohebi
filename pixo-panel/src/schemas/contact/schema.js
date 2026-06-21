import z from "zod";

export const contactFormSchema = z.object({
  title: z.string().max(100, "تعداد کاراکتر غیر مجاز"),
  options: z
    .string()
    .min(1, "موضوع ها ضروری است")
    .max(2000, "تعداد کاراکتر غیر مجاز"),
  public_key: z
    .string()
    .min(1, "کلید عمومی ضروری است")
    .max(100, "تعداد کاراکتر غیر مجاز"),
  service_key: z
    .string()
    .min(1, "کلید سرویس ضروری است")
    .max(100, "تعداد کاراکتر غیر مجاز")
    .startsWith("service_", "کلید سرویس معتبر نیست"),
  template_id: z
    .string()
    .min(1, "ایدی قالب ضروری است")
    .max(100, "تعداد کاراکتر غیر مجاز")
    .startsWith("template_", "آیدی قالب معتبر نیست"),
});

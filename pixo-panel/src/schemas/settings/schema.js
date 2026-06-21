import z from "zod";
import { fileSchemaOptional } from "..";

const brandSettingsSchema = z.object({
  brand_name: z
    .string()
    .min(1, "نام برند ضروری است")
    .max(100, "تعداد کاراکتر غیر مجاز"),

  logo: fileSchemaOptional(),

  fav_icon: fileSchemaOptional(),
});

const seoSchema = z.object({
  description: z
    .string()
    .min(1, "توضیحات ضروری است")
    .max(500, "تعداد کاراکتر غیر مجاز"),

  keywords: z
    .string()
    .min(1, "کلمات کلیدی ضروری است")
    .max(500, "تعداد کاراکتر غیر مجاز"),
});

const optionalUrl = (fieldName) =>
  z
    .string()
    .optional()
    .refine(
      (val) => !val || z.string().url().safeParse(val).success,
      `آدرس ${fieldName} معتبر نیست`,
    )
    .default("");

const validDynamicUrl = z
  .string()
  .optional()
  .refine(
    (val) => !val || z.string().url().safeParse(val).success,
    "آدرس پلتفرم جدید معتبر نیست",
  );

const socialsSchema = z.object({
  socials: z
    .object({
      facebook: optionalUrl("فیسبوک"),
      instagram: optionalUrl("اینستاگرام"),
      twitter: optionalUrl("توییتر"),
      linkedin: optionalUrl("لینکدین"),
      github: optionalUrl("گیت‌هاب"),
      telegram: optionalUrl("تلگرام"),
    })
    .catchall(validDynamicUrl),
});

const pagesSchema = z.object({
  visible_pages: z.object({
    hero: z.boolean().optional().default(false),
    about: z.boolean().optional().default(false),
    services: z.boolean().optional().default(false),
    gallery: z.boolean().optional().default(false),
    blog: z.boolean().optional().default(false),
    experience: z.boolean().optional().default(false),
    testimonial: z.boolean().optional().default(false),
    contact: z.boolean().optional().default(false),
    footer: z.boolean().optional().default(false),
  }),
});

const contactSchema = z.object({
  phone_number: z
    .string()
    .min(1, "شماره تلفن ضروری است")
    .max(11, "تعداد کاراکتر غیر مجاز")
    .refine(
      (val) => !val || /^[0-9+\-()\s]+$/.test(val.trim()),
      "شماره تلفن معتبر نیست",
    ),

  email: z
    .string()
    .min(1, "ایمیل ضروری است")
    .max(100, "تعداد کاراکتر غیر مجاز")
    .refine(
      (val) => !val || z.string().email().safeParse(val.trim()).success,
      "ایمیل معتبر نیست",
    ),
});

const footerSchema = z.object({
  address: z
    .string()
    .min(1, "آدرس ضروری است")
    .max(100, "تعداد کاراکتر غیر مجاز"),

  location: z
    .string()
    .min(1, "لینک لوکیشن ضروری است")
    .max(300, "تعداد کاراکتر غیر مجاز")
    .refine(
      (val) => !val || z.string().url().safeParse(val).success,
      "لینک لوکیشن معتبر نیست",
    ),

  footer_text: z.string().max(100, "تعداد کاراکتر غیر مجاز"),
});

export {
  brandSettingsSchema,
  seoSchema,
  socialsSchema,
  pagesSchema,
  contactSchema,
  footerSchema,
};

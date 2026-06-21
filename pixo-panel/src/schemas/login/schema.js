import { z } from "zod";

const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "ایمیل ضروری است")
    .email("ایمیل وارد شده معتبر نیست"),
  password: z.string().trim().min(1, "رمز عبور ضروری است"),
});

export { loginSchema };

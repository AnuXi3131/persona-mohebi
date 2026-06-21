import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { CircleQuestionMark, Loader2, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";
import { CardAuth, Input, Label, Button, Tooltip } from "../../components/ui";
import { loginSchema } from "../../schemas";

function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(values) {
    try {
      await login(values.email, values.password);
      toast.success("ورود موفقیت آمیز بود");
      navigate("/admin/install", { replace: true });
    } catch (error) {
      if (error.code === 429) {
        toast.error("تعداد درخواست غیر مجاز");
      } else if (error.code === 401) {
        toast.error("خطا در دسترسی به اینترنت");
      } else {
        toast.error("اطلاعات وارد شده نادرست است");
      }
    }
  }

  return (
    <CardAuth
      title={"ورود کاربر"}
      sub={"برای استفاده و یا مشاهده تمامی بخش ها لطفا وارد شوید."}
    >
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-5">
          <div className="grid gap-2">
            <Label label={"ایمیل"} htmlFor={"email"} />
            <Input
              type={"email"}
              name={"email"}
              id="email"
              placeholder={"admin@gmail.com"}
              dir={"ltr"}
              disabled={isSubmitting}
              register={register}
              error={errors.email}
            />
          </div>
          <div className="grid gap-2">
            <Label label={"رمز عبور"} htmlFor={"password"} />

            <Input
              type={"password"}
              name={"password"}
              id="password"
              dir={"ltr"}
              disabled={isSubmitting}
              register={register}
              error={errors.password}
            />
          </div>
          <div className="mt-7">
            <Button
              type="submit"
              label={isSubmitting ? "در حال ورود..." : "ورود"}
              icon={isSubmitting ? Loader2 : LogIn}
              loading={isSubmitting}
              className={"w-full [&>svg]:rotate-180"}
            />
          </div>
        </div>
      </form>

      <Tooltip
        content={
          "برای ورود به حساب به عنوان ادمین، لازم است در appwrite اکانت ادمین خود را ساخته باشید."
        }
        offset={95}
        className={"inline-block"}
      >
        <Button
          label={"راهنمایی ورود"}
          varient="outline"
          icon={CircleQuestionMark}
        />
      </Tooltip>
    </CardAuth>
  );
}
export default LoginPage;

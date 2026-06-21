import { Link } from "react-router-dom";
import { useAuth } from "../../contexts";
import { Button } from "../../components/ui";

function Welcome() {
  const { user } = useAuth();

  return (
    <div className="bg-background grid w-full gap-9 px-4 py-14">
      <div className="grid gap-3">
        <h1 className="font-weight-bold text-2xl text-pretty md:text-4xl">
          به پنل مدیریت{" "}
          <span className="underline underline-offset-16">پرسونا</span> خوش
          آمدید
        </h1>
        <p className="text-muted-foreground text-pretty">
          برای شروع ابتدا وارد حساب کاربری خود شوید و از منو سمت راست یکی از
          گزینه ها، را انتخاب کنید
        </p>
      </div>
      <div className="w-max">
        {!user && (
          <Link to={"/auth/login"}>
            <Button label={"ورود به حساب"} />
          </Link>
        )}
        {user && (
          <Link to={"/admin/dashboard"}>
            <Button label={"رفتن به داشبورد"} />
          </Link>
        )}
      </div>
    </div>
  );
}
export default Welcome;

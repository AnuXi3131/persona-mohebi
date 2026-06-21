import { Loader2, RefreshCcw } from "lucide-react";
import { Button, CardAuth } from "../../components/ui";
import { useAuth } from "../../contexts";

function LoggedPage() {
  const { loading, user, getUser } = useAuth();

  return (
    <CardAuth
      title={user ? `سلام ${user.name || "کاربر"} عزیز` : "شما لاگین نیستید"}
      sub={"مشکلی پیش آمده ؟"}
    >
      <Button
        label={loading ? "در حال بررسی..." : "بررسی مجدد"}
        icon={loading ? Loader2 : RefreshCcw}
        onClick={getUser}
        loading={loading}
        className={"w-full [&>svg]:rotate-180"}
      />
    </CardAuth>
  );
}

export default LoggedPage;

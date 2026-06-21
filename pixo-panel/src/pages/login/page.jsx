import { Loader } from "../../components/ui";
import { useAuth } from "../../contexts";
import LoginPage from "./login-page";
import LoggedPage from "./logged-page";

function Login() {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <>
        <title>مشاهده وضعیت</title>
        <Loader text={"در حال بررسی احراز هویت..."} className={"main-height"} />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <title>صفحه ورود</title>
        <LoginPage />
      </>
    );
  }

  return (
    <>
      <title>مشاهده وضعیت</title>
      <LoggedPage />
    </>
  );
}
export default Login;

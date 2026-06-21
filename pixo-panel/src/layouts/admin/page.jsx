import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts";
import { Loader } from "../../components/ui";

function AdminControl() {
  const { loading, user } = useAuth();

  if (loading) {
    return (
      <Loader text={"در حال بررسی احراز هویت..."} className={"main-height"} />
    );
  }

  if (!user) {
    return <Navigate to={"/auth/login"} replace />;
  }

  return <Outlet />;
}
export default AdminControl;

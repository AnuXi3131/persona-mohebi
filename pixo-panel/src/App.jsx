import { ToastContainer } from "react-toastify";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import DashboardLayout from "./layouts/dashboard/page";

function App() {
  const router = useRoutes(routes);

  return (
    <>
      <DashboardLayout>{router}</DashboardLayout>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={true}
        rtl={true}
        draggable
        pauseOnHover={false}
        theme="colored"
        className={"cursor-grabbing select-none"}
      />
    </>
  );
}
export default App;

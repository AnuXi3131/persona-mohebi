import clsx from "clsx";
import { useState } from "react";
import { motion as Motion } from "motion/react";
import { User, LogOut, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth, useSidebar } from "../../../contexts";

function UserDropdown() {
  const [loading, setLoading] = useState(false);
  const { isOpen } = useSidebar();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  async function deleteUserSession() {
    setLoading(true);
    try {
      await logout();
      navigate("/auth/login");
    } catch {
      toast.error("هنگام خروج خطایی رخ داد");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Motion.ul
      initial={{ opacity: 0, x: 10, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 10, scale: 0.95 }}
      transition={{
        type: "tween",
        damping: 25,
        duration: 0.1,
      }}
      className={clsx(
        "bg-card border-border absolute right-5 bottom-20 z-10 flex flex-col gap-2 overflow-hidden rounded-lg border p-2 md:right-[105%] md:bottom-5",
        isOpen ? "" : "right-full",
      )}
    >
      <li className="border-border flex items-center gap-3 border-b p-2">
        <span className="bg-foreground text-background border-border rounded-lg border p-2">
          <User />
        </span>
        <span className="flex flex-col text-sm">
          <span>{user.name || "کاربر مهمان"}</span>
          <span>{user.email || "demo@gmail.com"}</span>
        </span>
      </li>
      <li>
        <button
          className="hover:bg-destructive/20 text-destructive ease-decelerate flex w-full items-center gap-3 rounded-lg p-2 duration-200"
          onClick={deleteUserSession}
          disabled={loading}
        >
          <span>{loading ? "در حال خروج" : "خروج"}</span>
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <LogOut size={20} className="rotate-180" />
          )}
        </button>
      </li>
    </Motion.ul>
  );
}

export default UserDropdown;

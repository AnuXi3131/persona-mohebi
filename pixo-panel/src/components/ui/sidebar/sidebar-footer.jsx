import clsx from "clsx";
import { useRef, useState } from "react";
import { Button, Loader } from "..";
import { useOutsideClick, useEscapeKey } from "../../../hooks";
import { useAuth, useSidebar } from "../../../contexts";
import { User, ChevronsUpDown, LogIn } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import UserDropdown from "./user-dropdown";

function SidebarFooter() {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const userInfoRef = useRef(null);
  const { loading, user } = useAuth();
  const { isOpen } = useSidebar();
  const navigate = useNavigate();

  useOutsideClick(userInfoRef.current, setDropdownMenu);
  useEscapeKey(dropdownMenu, setDropdownMenu);

  if (loading) {
    return (
      <div className="flex-center py-4">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return (
      <footer className="flex flex-1 flex-col-reverse px-3 py-4">
        <Button
          label={isOpen ? "ورود به حساب" : ""}
          icon={LogIn}
          onClick={() => navigate("/auth/login")}
          className={clsx(
            "w-full [&>svg]:rotate-180",
            isOpen ? "" : "px-0! py-3!",
          )}
        />
      </footer>
    );
  }

  return (
    <footer className="relative flex flex-1 flex-col-reverse px-3 py-4">
      <div ref={userInfoRef}>
        <button
          className={clsx(
            "ease-decelerate outline-foreground flex w-full cursor-pointer items-center gap-3 rounded-lg p-2 outline-2 duration-200 focus-visible:outline-solid",
            isOpen ? "hover:bg-accent justify-between" : "justify-center",
            isOpen && dropdownMenu ? "bg-accent" : "",
          )}
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <span className="flex items-center gap-3">
            <span className="bg-foreground text-background border-border rounded-lg border p-2">
              <User />
            </span>
            {isOpen && (
              <span className="flex flex-col text-right text-sm">
                <span>{user.name || "کاربر مهمان"}</span>
                <span>{user.email || "ایمیل یافت نشد"}</span>
              </span>
            )}
          </span>
          {isOpen && <ChevronsUpDown size={20} />}
        </button>
        {/*  */}
        <AnimatePresence mode="wait">
          {dropdownMenu && <UserDropdown />}
        </AnimatePresence>
      </div>
    </footer>
  );
}

export default SidebarFooter;

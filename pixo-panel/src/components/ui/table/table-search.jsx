import clsx from "clsx";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button, Input } from "..";
import { AnimatePresence, motion as Motion } from "motion/react";
import { useMediaQuery } from "react-responsive";
import { useTable } from "../../../contexts";

function TableSearch() {
  const { setSearchText, searchBy } = useTable();
  const isMobile = useMediaQuery({ maxWidth: "48rem" });
  const [isOpen, setIsOpen] = useState(isMobile);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen && !isMobile) {
      inputRef.current.focus();
    } else {
      setSearchText("");
    }
  }, [isOpen, isMobile, setSearchText]);

  return (
    searchBy && (
      <div className={clsx("flex gap-3")}>
        <AnimatePresence mode="wait">
          {(isOpen || isMobile) && (
            <Motion.div
              key={isOpen}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2, ease: "easeInOut", damping: 100 }}
            >
              <Input
                ref={inputRef}
                type="search"
                id="search"
                name="search"
                placeholder={`جستجو بر اساس ${searchBy}`}
                className={"appearance-none"}
                onChange={(e) =>
                  setSearchText(e.target.value.trim().toLowerCase())
                }
              />
            </Motion.div>
          )}
        </AnimatePresence>

        {!isMobile && (
          <Button
            varient="outline"
            icon={isOpen ? X : Search}
            className={"p-3!"}
            onClick={() => setIsOpen(!isOpen)}
          />
        )}
      </div>
    )
  );
}
export default TableSearch;

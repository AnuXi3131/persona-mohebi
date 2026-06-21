import { createContext, useContext, useState } from "react";
import { useMediaQuery } from "react-responsive";

const SidebarContext = createContext();

export function SidebarProvider({ children }) {
  const isDesktop = useMediaQuery({ minWidth: "48rem" });
  const [isOpen, setIsOpen] = useState(isDesktop);

  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

/**
 * @property {boolean} isOpen
 * @property {Function} setIsOpen
 */
export const useSidebar = () => useContext(SidebarContext);

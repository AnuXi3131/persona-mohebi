import clsx from "clsx";
import { useRef, useState } from "react";
import { AnimatePresence, motion as Motion } from "motion/react";

/**
 *
 * @property {Array} tabs
 * @property {Array} components
 */

function Tabs({ tabs = [], components = [] }) {
  const [activeTab, setActiveTab] = useState(1);
  const [prevTab, setPrevTab] = useState(null);
  const tabsContainerRef = useRef(null);
  const tabTrackerRef = useRef(null);

  // get where to animate direction based on active & prev TAB
  const direction = activeTab > prevTab ? -1 : 1;

  function renderComponent() {
    const Component = components.find(({ id }) => activeTab === id);
    return Component.component;
  }

  function handleTracker(e) {
    const tabsContainerRect = tabsContainerRef.current.getBoundingClientRect();
    const tabRect = e.target.getBoundingClientRect();

    const offsetLeft = tabRect.left - tabsContainerRect.left;
    const offsetTop = tabRect.top - tabsContainerRect.top;

    tabTrackerRef.current.style.width = tabRect.width + "px";
    tabTrackerRef.current.style.height = tabRect.height + "px";
    tabTrackerRef.current.style.left = offsetLeft + "px";
    tabTrackerRef.current.style.top = offsetTop + "px";
    tabTrackerRef.current.style.opacity = 1;
  }

  return (
    <>
      <div className="container px-4">
        <div className="overflow-x-auto">
          <nav
            ref={tabsContainerRef}
            className="relative flex w-[200px] gap-2 py-3"
            role="tablist"
          >
            {/*  */}
            <div
              ref={tabTrackerRef}
              className="bg-accent ease-decelerate absolute z-[-1] rounded-lg duration-200"
            ></div>
            {/*  */}
            {tabs.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                role="tab"
                onClick={() => {
                  if (activeTab == id) return;
                  setPrevTab(activeTab);
                  setActiveTab(id);
                }}
                onMouseEnter={(e) => handleTracker(e)}
                onMouseLeave={() => (tabTrackerRef.current.style.opacity = "0")}
                className={clsx(
                  "ease-decelerate relative border-b-2 px-4 py-2 text-sm font-medium text-nowrap duration-700 focus-visible:outline-2 focus-visible:outline-current focus-visible:outline-solid",
                  activeTab === id
                    ? "border-foreground text-foreground"
                    : "text-muted-foreground hover:text-foreground hover:border-border border-transparent",
                )}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/*  */}
      <div className="border-border mb-5 border-b"></div>
      {/*  */}
      <div className="container px-4">
        <div className="pb-8">
          <AnimatePresence mode="popLayout">
            <Motion.div
              key={[activeTab, prevTab]}
              initial={{ x: direction * 500, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction * -500, opacity: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeInOut",
                damping: 200,
              }}
            >
              {renderComponent()}
            </Motion.div>
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}

export default Tabs;

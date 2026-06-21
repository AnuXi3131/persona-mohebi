import clsx from "clsx";
import { motion as Motion } from "motion/react";
import viteLogo from "/images/icons/vite.svg";
import appwriteLogo from "/images/icons/appwrite.svg";
import reactLogo from "/images/icons/react.svg";
import tailwindcss from "/images/icons/tailwindcss.svg";
import databaseScreenshot from "/images/figures/database-screenshot.png";
import brandSettings from "/images/figures/brand-settings.png";
import fontSettings from "/images/figures/font-settings.png";
import themeSettings from "/images/figures/theme-settings.png";

function DashedLineSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 340 521"
      className="stroke-foreground"
    >
      <Motion.path
        initial={{ opacity: 0, strokeDashoffset: 1000 }}
        animate={{ opacity: 1, strokeDashoffset: 0 }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          damping: 100,
        }}
        strokeDasharray="4 4"
        d="M54 515V279.5c0-6.627 5.373-12 12-12h104.5m0 0V165m0 102.5h134c6.627 0 12 5.373 12 12V469h-22v52m-124-356h-158c-6.627 0-12-5.373-12-12V40m170 125V85.5m0 79.5 156.607-1.394c6.585-.059 11.893-5.414 11.893-12V4.5m-168.5 81H214c6.627 0 12-5.373 12-12V40m-55.5 45.5V73c0-6.627-5.373-12-12-12h-32c-6.627 0-12-5.373-12-12V0"
      ></Motion.path>
    </svg>
  );
}

function TechCard({ imgSrc, className }) {
  return (
    <div
      className={clsx(
        "flex-center border-border size-16 rounded-lg border border-solid p-1",
        className,
      )}
    >
      <img src={imgSrc} alt="" loading="lazy" />
    </div>
  );
}

function CenterCard() {
  return (
    <div className="bg-background flex-center gap-3 px-6 py-3">
      <img src="./logo.svg" alt="persona logo" className="size-8" />
      <span className="text-muted-foreground">Persona</span>
    </div>
  );
}

function ResultView({ imgSrc, className }) {
  return (
    <div className="bg-muted flex-center border-border h-24 overflow-hidden rounded-lg border-2 border-dashed md:aspect-video">
      <img
        src={imgSrc}
        alt=""
        loading="lazy"
        className={clsx("object-cover", className)}
      />
    </div>
  );
}

function Features() {
  return (
    <div className="relative mx-auto w-full px-2 md:w-[400px] md:px-4">
      <div className="pointer-events-none absolute inset-0 px-12">
        <DashedLineSvg />
      </div>

      <div className="relative flex flex-col items-center justify-between gap-14">
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeIn", delay: 3 }}
          className="flex w-full justify-between"
        >
          <TechCard imgSrc={viteLogo} className={"bg-accent -translate-y-2"} />
          <TechCard
            imgSrc={reactLogo}
            className={"bg-primary-foreground translate-y-2"}
          />
          <TechCard
            imgSrc={appwriteLogo}
            className={"bg-accent -translate-y-2"}
          />
          <TechCard
            imgSrc={tailwindcss}
            className={"bg-primary-foreground translate-y-2"}
          />
        </Motion.div>

        <Motion.div
          initial={{ filter: "blur(6px)" }}
          animate={{ filter: "blur(0px)" }}
          transition={{ duration: 0.5, ease: "easeIn", delay: 2 }}
        >
          <CenterCard />
        </Motion.div>

        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: "easeIn", delay: 3 }}
          className="mt-6 grid grid-cols-2 gap-3 md:gap-x-12 md:gap-y-6"
        >
          <ResultView imgSrc={databaseScreenshot} className={"rotate-12"} />
          <ResultView imgSrc={brandSettings} className={"-rotate-12"} />
          <ResultView imgSrc={fontSettings} className={"-rotate-12"} />
          <ResultView imgSrc={themeSettings} className={"rotate-12"} />
        </Motion.div>
      </div>
    </div>
  );
}
export default Features;

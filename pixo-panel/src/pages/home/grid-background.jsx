import { Plus } from "lucide-react";
import { motion as Motion } from "motion/react";

function GridBackground() {
  const rows = 12;
  const cols = 12;
  const cells = Array.from({ length: rows * cols });

  return (
    <div
      className="border-border pointer-events-none grid h-full grid-cols-2 border-t border-l border-solid md:grid-cols-12"
      aria-hidden="true"
    >
      {cells.map((_, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const diagonalIndex = row + (cols + col);
        const delay = diagonalIndex * 0.03;
        const jumpThree = Math.floor(i / 3) % 3 === 0;

        return (
          <Motion.div
            key={i}
            initial={{
              opacity: 0,
              filter: "blur(6px)",
              background: "var(--color-foreground)",
            }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              background: "var(--color-background)",
            }}
            transition={{
              duration: 0.3,
              delay,
              ease: "easeIn",
              damping: 100,
            }}
            className="border-border relative h-24 border-r border-b border-solid"
            aria-hidden="true"
          >
            {jumpThree && (
              <Plus className="text-border absolute -top-3 -right-3" />
            )}
          </Motion.div>
        );
      })}
    </div>
  );
}
export default GridBackground;

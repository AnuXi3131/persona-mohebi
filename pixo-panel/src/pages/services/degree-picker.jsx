import { useEffect, useState } from "react";
import { Input, Tooltip } from "../../components/ui";

function DegreeSelector({ value, onChange, disabled }) {
  const [hovered, setHovered] = useState(false);
  const degree = value;

  useEffect(() => {
    function blockScroll(e) {
      e.preventDefault();
    }

    if (hovered) {
      window.addEventListener("wheel", blockScroll, { passive: false });
    } else {
      window.removeEventListener("wheel", blockScroll);
    }

    return () => window.removeEventListener("wheel", blockScroll);
  }, [hovered]);

  function normalize(val) {
    if (val < 0) return 0;
    if (val > 360) return 360;
    return val;
  }

  function handleWheel(e) {
    if (e.deltaY > 0) {
      onChange(normalize(value + 10));
    } else {
      onChange(normalize(value - 10));
    }
  }

  function handleInput(e) {
    const val = Number(e.target.value);
    if (!isNaN(val)) onChange(normalize(val));
  }

  return (
    <Tooltip content={"درجه بک گراند"} offset={40} className={"inline-block"}>
      <div
        className="flex gap-2"
        disabled={disabled}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className="border-border bg-accent-foreground flex size-12 justify-center rounded-full border border-solid inset-shadow-black"
          onWheel={handleWheel}
        >
          <div
            className={
              "from-accent ease-smooth relative h-full w-1 origin-center rounded-full bg-linear-to-b via-transparent to-transparent duration-200"
            }
            style={{
              rotate: degree + "deg",
            }}
          >
            <div className="bg-accent absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full"></div>
          </div>
        </div>

        <Input
          type="number"
          value={degree}
          onChange={handleInput}
          className={"w-20"}
          disabled={disabled}
        />
      </div>
    </Tooltip>
  );
}
export default DegreeSelector;

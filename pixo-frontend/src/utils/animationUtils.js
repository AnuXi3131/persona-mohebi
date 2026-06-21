import toast from "./toast";

export const isAnimationActive = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

if (isAnimationActive)
  setTimeout(() => toast("انیمیشن ها متوقف شدند", "bg-primary-blue"), 1000);

function show(elm, showClass, hideClass) {
  if (!elm) return;

  elm.hidden = false;
  elm.classList.add(showClass);
  elm.classList.remove(hideClass, "pointer-events-none");

  if (!isAnimationActive) {
    elm.addEventListener(
      "animationend",
      () => {
        elm.hidden = false;
      },
      { once: true },
    );
  } else {
    elm.hidden = false;
  }
}

function hide(elm, showClass, hideClass) {
  if (!elm) return;

  elm.classList.add(hideClass, "pointer-events-none");
  elm.classList.remove(showClass);

  if (!isAnimationActive) {
    elm.addEventListener(
      "animationend",
      () => {
        elm.hidden = true;
      },
      { once: true },
    );
  } else {
    elm.hidden = true;
  }
}

export { show, hide };

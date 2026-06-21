function Loader(parent, isLoading = false) {
  let loader = parent.querySelector(":scope > .loader");

  if (!isLoading) {
    if (loader) loader.remove();
    return;
  }

  if (!loader) {
    loader = document.createElement("div");
    loader.ariaHidden = "true";
    loader.className = "loader";

    const containerPos = getComputedStyle(parent).position;
    if (containerPos === "static") {
      parent.style.position = "relative";
    }

    const bars = document.createDocumentFragment();
    for (let i = 0; i < 5; i++) {
      const bar = document.createElement("div");
      bar.className = "loader-bar";
      bar.style.animationDelay = `${i * 100}ms`;
      bars.appendChild(bar);
    }
    loader.appendChild(bars);

    parent.appendChild(loader);
  }
}

export default Loader;

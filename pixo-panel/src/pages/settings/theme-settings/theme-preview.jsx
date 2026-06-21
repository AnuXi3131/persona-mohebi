function ThemePreview({ mode }) {
  const {
    background,
    border,
    surface,
    primary,
    accent,
    secondary,
    muted,
    text,
  } = mode;

  return (
    <div
      className="grid w-full gap-2 p-3"
      style={{ background, borderColor: border }}
    >
      <div className="grid gap-2">
        <h3 style={{ color: text }}>
          {mode === "dark" ? "نسخه دارک" : "نسخه لایت"}
        </h3>

        <header
          className="flex flex-wrap gap-2 rounded-lg p-2"
          style={{ background: surface }}
        >
          {[primary, accent, secondary, muted].map((color, i) => (
            <div
              key={i}
              className="h-3 w-8 rounded-full"
              style={{ background: color }}
            />
          ))}
        </header>
      </div>

      <div
        className="flex-center h-20 rounded-lg px-3"
        style={{ background: surface }}
      >
        <div
          className="h-4 w-full rounded-full"
          style={{ background: border }}
        />
      </div>
    </div>
  );
}

export default ThemePreview;

const DEFAULT_LINEAR = {
  degree: 0,
  startColor: "#000000",
  midColor: "#000000",
  endColor: "#000000",
};

export function parseLinearGradient(value) {
  if (!value || typeof value !== "string") {
    return DEFAULT_LINEAR;
  }

  const match = value.match(
    /linear-gradient\(([-\d.]+)deg,\s*([^,]+),\s*([^,]+),\s*([^)]+)\)/i,
  );

  if (!match) {
    return DEFAULT_LINEAR;
  }

  return {
    degree: Number(match[1]) || 0,
    startColor: match[2].trim(),
    midColor: match[3].trim(),
    endColor: match[4].trim(),
  };
}

export function buildLinearGradient({
  degree = 0,
  startColor = "#000000",
  midColor = "#000000",
  endColor = "#000000",
}) {
  const normalizedDegree = Number(degree) || 0;
  return `linear-gradient(${normalizedDegree}deg, ${startColor}, ${midColor}, ${endColor})`;
}

export { DEFAULT_LINEAR as DEFAULT_LINEAR_GRADIENT };

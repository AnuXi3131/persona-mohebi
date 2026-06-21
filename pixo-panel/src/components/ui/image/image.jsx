import clsx from "clsx";
import { useState } from "react";

/**
 *
 * @property {string} src
 * @property {string} alt
 * @property {loading} loading => image loading attribute e.g: lazy
 * @property {string} className
 * @property {Function} fallback => fallback function to replace placeholder image
 */

function Image({ src, alt, loading, className, fallback }) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      loading={loading}
      className={clsx(className)}
      onError={() => setImgSrc(fallback || "/images/placeholders/no-image.jpg")}
    />
  );
}
export default Image;

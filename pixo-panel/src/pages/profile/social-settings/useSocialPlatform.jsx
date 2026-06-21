import { useEffect, useState } from "react";
import { SOCIAL_PLATFORMS } from "../../../constants/maps/socialPlatforms";
import { toast } from "react-toastify";

function useSocialPlatform({ column, form }) {
  const [platforms, setPlatforms] = useState(SOCIAL_PLATFORMS);

  useEffect(() => {
    if (!column) return;

    const customKeys = Object.keys(column).filter((k) =>
      k.startsWith("custom_"),
    );

    setPlatforms((prev) => {
      const existing = new Set(prev.map((p) => p.key));
      const fresh = customKeys
        .filter((k) => !existing.has(k))
        .map((key) => ({
          key,
          label: "پلتفرم سفارشی",
          placeholder: "https://",
        }));

      return [...prev, ...fresh];
    });

    customKeys.forEach((key) => {
      if (!form.getValues(`socials.${key}`)) {
        form.register(`socials.${key}`);
      }
    });
  }, [column]);

  return {
    platforms,
    addCustom(name) {
      if (!name.trim()) return toast.error("نام ضروری است");

      const key = `custom_${Date.now()}`;
      setPlatforms((prev) => [
        ...prev,
        { key, label: name, placeholder: "https://..." },
      ]);
      form.register(`socials.${key}`);
      form.setValue(`socials.${key}`);
      form.trigger();
    },
    removeCustom(key) {
      setPlatforms((prev) => prev.filter((p) => p.key !== key));
      form.unregister(`socials.${key}`);
    },
  };
}

export default useSocialPlatform;

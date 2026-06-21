import clsx from "clsx";
import { fonts } from "../../../constants/maps/fonts";
import { useEffect, useRef, useState } from "react";
import { database } from "../../../services/appwrite/appwrite.config";
import { DATABASE_ID, THEME_SETTINGS_ID } from "../../../services/appwrite";
import { Check, FileTypeCorner, Info, Loader2 } from "lucide-react";
import previewSelectFont from "./preview-select-font";
import handleSelectFont from "./handle-select-font";
import { motion as Motion } from "motion/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
} from "../../../components/ui";

function FontSettings() {
  const [loading, setLoading] = useState(false);
  const [font, setFont] = useState("dana");
  const fontsContainerRef = useRef(null);

  useEffect(() => {
    const loadSavedFont = async () => {
      setLoading(true);
      try {
        const themeSettings = await database.getDocument({
          databaseId: DATABASE_ID,
          collectionId: THEME_SETTINGS_ID,
          documentId: THEME_SETTINGS_ID,
        });

        const savedFontData = JSON.parse(themeSettings.font_face);
        previewSelectFont(
          savedFontData.value,
          savedFontData.url,
          fontsContainerRef,
        );
        setFont(savedFontData.value);
      } finally {
        setLoading(false);
      }
    };

    loadSavedFont();

    return () => {
      document
        .querySelectorAll(`[data-font-style="dynamic-font"]`)
        ?.forEach((el) => el.remove());
    };
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>سفارشی سازی فونت</CardTitle>
        <CardDescription>فونت سایت خود را شخصی سازی کنید</CardDescription>
      </CardHeader>
      <CardContent>
        <h1 className="text-destructive mb-8 flex items-center gap-2">
          <Info size={20} />
          <p className="flex-1">
            برای مشاهده پیشنمایش و اعمال فونت، برروی فونت مورد نظر کلیک کنید.
          </p>
        </h1>
        <div ref={fontsContainerRef} className="grid-items-3">
          {fonts.map(({ value, label, url, preview }) => (
            <div
              key={value}
              className={clsx(
                "bg-accent default-input hover:border-primary ease-decelerate grid gap-3 rounded-lg px-3 py-4 text-right duration-200",
                font === value
                  ? "border-sidebar-primary bg-sidebar-primary/30"
                  : "hover:bg-accent/50",
              )}
              disabled={loading}
            >
              <div className="grid gap-3">
                <header className="font-weight-bold flex items-center gap-2 text-2xl md:text-4xl">
                  {
                    <Motion.i
                      key={font}
                      initial={{ opacity: 0, x: 10, scale: 0 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0 }}
                      transition={{ duration: 0.1 }}
                    >
                      {value === font ? (
                        <Check size={40} />
                      ) : (
                        <FileTypeCorner size={40} />
                      )}
                    </Motion.i>
                  }
                  <h3
                    className="line-clamp-3 py-1 break-all"
                    suppressContentEditableWarning
                    contentEditable
                  >
                    {label}
                  </h3>
                </header>
                <p
                  className="text-muted-foreground line-clamp-6 leading-9 break-all"
                  suppressContentEditableWarning
                  contentEditable
                >
                  {preview}
                </p>
              </div>
              <Button
                varient="outline"
                label={
                  loading
                    ? "در حال ذخیره..."
                    : value === font
                      ? "انتخاب شده"
                      : "انتخاب فونت"
                }
                icon={loading ? Loader2 : undefined}
                loading={loading || (value === font && true)}
                className={clsx(
                  "mt-auto max-h-12",
                  value === font && "bg-muted opacity-50",
                )}
                onClick={() => {
                  handleSelectFont(
                    { value, url },
                    setLoading,
                    setFont,
                    database,
                    DATABASE_ID,
                    THEME_SETTINGS_ID,
                  );
                  previewSelectFont(value, url, fontsContainerRef);
                }}
              />
            </div>
          ))}
          <div className="bg-accent hover:bg-accent/50 default-input hover:border-primary ease-decelerate col-span-full grid cursor-default gap-3 rounded-lg px-3 py-4 text-center duration-200">
            فونت های بیشتر در اپدیت های بعدی
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
export default FontSettings;

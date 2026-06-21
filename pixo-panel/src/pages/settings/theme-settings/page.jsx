import clsx from "clsx";
import { useEffect, useState } from "react";
import { themes } from "../../../constants/maps/themes";
import { database } from "../../../services/appwrite/appwrite.config";
import { DATABASE_ID, THEME_SETTINGS_ID } from "../../../services/appwrite";
import { toast } from "react-toastify";
import ThemePreview from "./theme-preview";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui";

function ThemeSettings() {
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState("rose");

  useEffect(() => {
    async function loadTheme() {
      setLoading(true);
      try {
        const doc = await database.getDocument({
          databaseId: DATABASE_ID,
          collectionId: THEME_SETTINGS_ID,
          documentId: THEME_SETTINGS_ID,
        });
        setTheme(doc.theme_name);
      } finally {
        setLoading(false);
      }
    }

    loadTheme();
  }, []);

  async function saveTheme(key) {
    setLoading(true);
    try {
      await database.updateDocument({
        databaseId: DATABASE_ID,
        collectionId: THEME_SETTINGS_ID,
        documentId: THEME_SETTINGS_ID,
        data: { theme_name: key },
      });
      toast.success("تم به‌ روزرسانی شد");
    } catch (error) {
      if (error.code === 404) {
        await database.createDocument({
          databaseId: DATABASE_ID,
          collectionId: THEME_SETTINGS_ID,
          documentId: THEME_SETTINGS_ID,
          data: { theme_name: key },
        });
      }
      toast.success("تم ذخیره شد");
    } finally {
      setTheme(key);
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>سفارشی سازی تم</CardTitle>
        <CardDescription>رنگ های قالب خود را شخصی سازی کنید</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid-items-3">
          {Object.entries(themes).map(([key, { name, dark, light }]) => (
            <button
              key={key}
              disabled={loading}
              className={clsx(
                "bg-accent border-border hover:border-primary ease-soft focus-visible:ring-input rounded-lg border border-solid duration-200 focus-visible:ring-4",
                theme === key && "border-sidebar-primary",
              )}
              onClick={() => saveTheme(key)}
            >
              <figure className="grid overflow-hidden rounded-t-lg md:flex">
                <ThemePreview mode={dark} />
                <ThemePreview mode={light} />
              </figure>

              <div className="flex items-center gap-2 p-2 pt-0">
                <div className="bg-input border-border size-5 rounded-full border p-0.5">
                  <span
                    className={clsx(
                      "bg-sidebar-primary block size-full scale-0 rounded-full opacity-0 duration-200",
                      theme === key && "scale-100 opacity-100",
                    )}
                  />
                </div>
                <h2 className="text-muted-foreground text-lg">{name}</h2>
              </div>
            </button>
          ))}

          <button className="flex-center bg-accent border-border cursor-default rounded-lg border p-2">
            تم‌های بیشتر در آپدیت‌های بعدی
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default ThemeSettings;

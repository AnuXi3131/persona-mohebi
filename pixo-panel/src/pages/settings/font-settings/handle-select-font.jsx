import { toast } from "react-toastify";

async function handleSelectFont(
  data,
  setLoading,
  setFont,
  database,
  DATABASE_ID,
  THEME_SETTINGS_ID,
) {
  setLoading(true);

  const payload = {
    font_face: JSON.stringify(data),
  };

  try {
    await database.updateDocument({
      databaseId: DATABASE_ID,
      collectionId: THEME_SETTINGS_ID,
      documentId: THEME_SETTINGS_ID,
      data: payload,
    });
    toast.success("فونت با موفقیت به روزرسانی شد");
  } catch (error) {
    if (error.code === 404) {
      await database.createDocument({
        databaseId: DATABASE_ID,
        collectionId: THEME_SETTINGS_ID,
        documentId: THEME_SETTINGS_ID,
        data: payload,
      });
      toast.success("فونت ذخیره شد");
    } else if (error.code === 401) {
      toast.error("دسترسی رد شد");
    } else {
      toast.error("خطا در اعمال فونت");
    }
  } finally {
    setFont(data.value);
    setLoading(false);
  }
}

export default handleSelectFont;

import { toast } from "react-toastify";
import { STORAGE_ID } from "../services/appwrite";
import { ID, storage } from "../services/appwrite/appwrite.config";

async function uploadFile(file, prevId, onProgress) {
  if (!(file instanceof File)) return prevId;

  const emitProgress = (v) => onProgress?.(Math.round(v));

  try {
    emitProgress(0);

    const created = await storage.createFile({
      bucketId: STORAGE_ID,
      fileId: ID.unique(),
      file: file,
      onProgress: (e) => emitProgress(e?.progress ?? 0),
    });

    emitProgress(100);

    if (prevId)
      await storage.deleteFile({ bucketId: STORAGE_ID, fileId: prevId });

    return created.$id;
  } catch (error) {
    if (error.code === 401) {
      toast.error("دسترسی رد شد");
      return;
    }
    toast.error("خطا در آپلود فایل");
    emitProgress(0);
    return prevId;
  }
}

export default uploadFile;

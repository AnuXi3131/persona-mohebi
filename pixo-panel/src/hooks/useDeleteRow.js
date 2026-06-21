import { useState } from "react";
import { database, storage } from "../services/appwrite/appwrite.config";
import { DATABASE_ID, STORAGE_ID } from "../services/appwrite";
import { toast } from "react-toastify";

/**
 * @property {string} collectionId
 */
function useDeleteRow(collectionId) {
  const [loading, setLoading] = useState(false);

  /**
   * @property {string} rowId
   * @property {string} fileId
   */
  async function deleteItem(rowId, fileId) {
    if (!rowId || !fileId) {
      toast.error("شناسه معتبر نیست");
      return;
    }

    setLoading(true);
    try {
      await database.deleteDocument({
        databaseId: DATABASE_ID,
        collectionId: collectionId,
        documentId: rowId,
      });
      await storage.deleteFile({
        bucketId: STORAGE_ID,
        fileId: fileId,
      });
      toast.success("آیتم با موفقیت حذف شد");
    } catch (error) {
      if (error.code === 401) {
        toast.error("دسترسی رد شد");
        return;
      }
      toast.error("خطا در حذف آیتم");
    } finally {
      setLoading(false);
    }
  }

  return { loading, deleteItem };
}

export default useDeleteRow;

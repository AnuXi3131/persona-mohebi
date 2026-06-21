import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { database } from "../services/appwrite/appwrite.config";
import { DATABASE_ID } from "../services/appwrite";

/**
 * @property {string} collectionId
 * @property {(doc: any) => any=} mapDocumentToInitialValues
 */
export function useItemEditor({
  collectionId,
  mapDocumentToInitialValues = (doc) => doc,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [itemId, setItemId] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(false);

  const close = useCallback(() => {
    setIsOpen(false);
    setItemId(null);
    setInitialData(null);
  }, []);

  const open = useCallback(
    async (id) => {
      if (!id) return;
      setIsOpen(true);
      setItemId(id);
      setLoading(true);

      try {
        const doc = await database.getDocument({
          databaseId: DATABASE_ID,
          collectionId,
          documentId: id,
        });

        setInitialData(mapDocumentToInitialValues(doc));
      } catch (error) {
        console.error("Error loading item:", error);
        toast.error("خطا در دریافت اطلاعات آیتم");
        close();
      } finally {
        setLoading(false);
      }
    },
    [collectionId, mapDocumentToInitialValues, close],
  );

  return {
    isOpen,
    open,
    close,
    loading,
    initialData,
    itemId,
  };
}

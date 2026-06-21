import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { database, ID, Query } from "../services/appwrite/appwrite.config";
import { DATABASE_ID } from "../services/appwrite";
import { toast } from "react-toastify";

/**
 *
 * @property {z.ZodSchema} schema
 * @property {Function} mapFieldsToPayload
 * @property {Function} mapFieldsToRows
 * @property {string} collectionID
 */
export function useRowsForm({
  schema,
  mapFieldsToRows = (docs) => docs,
  mapFieldsToPayload = (data) => data,
  collectionID,
}) {
  const [rows, setRows] = useState([]);
  const [queryLength, setQueryLength] = useState(5);
  const [loading, setLoading] = useState(false);
  const [stopFetching, setStopFetching] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, reset, formState, setValue } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  async function reloadRows() {
    setLoading(true);

    try {
      const response = await database.listDocuments({
        databaseId: DATABASE_ID,
        collectionId: collectionID,
        queries: [Query.limit(queryLength), Query.orderDesc("$createdAt")],
      });

      const allRows = response.documents;

      setRows(mapFieldsToRows(allRows));
      setStopFetching(allRows.length === queryLength);
    } catch (error) {
      console.warn("can't load previous rows", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    (async () => {
      await reloadRows();
    })();
  }, [queryLength]);

  async function onSubmit(data) {
    try {
      const payload = await mapFieldsToPayload(data);

      await database.createDocument({
        databaseId: DATABASE_ID,
        collectionId: collectionID,
        documentId: ID.unique(),
        data: payload,
      });

      await reloadRows();
      reset();
      toast.success("آیتم جدید با موفقیت اضافه شد");
    } catch (error) {
      if (error.code === 401) {
        toast.error("دسترسی رد شد");
        return;
      }
      toast.error("خطا در افزودن آیتم جدید");
    }
  }

  return {
    form,
    setValue,
    register,
    handleSubmit: handleSubmit(onSubmit),
    reset,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    rows,
    loading,
    setQueryLength,
    stopFetching,
    reloadRows,
  };
}

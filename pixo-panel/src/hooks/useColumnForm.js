import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { database } from "../services/appwrite/appwrite.config";
import { DATABASE_ID } from "../services/appwrite";

/**
 * @property {z.ZodSchema} schema
 * @property {Function} mapFieldsToForm
 * @property {Function} mapFieldsToPayload
 * @property {Function} mapFieldsToColumn
 * @property {string} collectionID
 * @property {string} columnID
 */
export function useColumnForm({
  schema,
  mapFieldsToForm = (data) => data,
  mapFieldsToPayload = (data) => data,
  mapFieldsToColumn = (data) => data,
  collectionID,
  columnID,
}) {
  const [column, setColumn] = useState(null);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
  });

  const { register, handleSubmit, reset, setValue, formState } = form;
  const { errors, isSubmitting } = formState;

  const mappersRef = useRef({ mapFieldsToForm, mapFieldsToColumn });
  mappersRef.current = { mapFieldsToForm, mapFieldsToColumn };

  useEffect(() => {
    const loadSavedData = async () => {
      setLoading(true);
      try {
        const currentColumn = await database.getDocument({
          databaseId: DATABASE_ID,
          collectionId: collectionID,
          documentId: columnID,
        });

        const formData = mappersRef.current.mapFieldsToForm(currentColumn);
        const columnData = mappersRef.current.mapFieldsToColumn(currentColumn);

        setColumn(columnData);
        reset(formData);
      } catch (error) {
        console.warn("can't find previous data", error);
      } finally {
        setLoading(false);
      }
    };

    loadSavedData();
  }, [reset, collectionID, columnID]);

  async function onSubmit(data) {
    const payload = await mapFieldsToPayload(data, column);
    try {
      await database.updateDocument({
        databaseId: DATABASE_ID,
        collectionId: collectionID,
        documentId: columnID,
        data: payload,
      });
      toast.success("تنظیمات با موفقیت به روزرسانی شد");
    } catch (error) {
      if (error.code === 404) {
        await database.createDocument({
          databaseId: DATABASE_ID,
          collectionId: collectionID,
          documentId: columnID,
          data: payload,
        });
        toast.success("تنظیمات با موفقیت ذخیره شد");
      } else if (error.code === 401) {
        toast.error("دسترسی رد شد");
      } else {
        toast.error("خطا در ذخیره تنظیمات");
      }
    } finally {
      const updatedColumn = mapFieldsToColumn(payload);
      setColumn(updatedColumn);
    }
  }

  return {
    form,
    register,
    handleSubmit: handleSubmit(onSubmit),
    reset,
    setValue,
    errors,
    isSubmitting,
    column,
    loading,
  };
}

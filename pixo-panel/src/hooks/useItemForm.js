import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { database, ID } from "../services/appwrite/appwrite.config";
import { DATABASE_ID } from "../services/appwrite";

/**
 *
 * @property {z.ZodSchema} schema
 * @property {"create" | "edit"} mode
 * @property {string} collectionId
 * @property {string=} itemId
 * @property {Object=} initialValues
 * @property {(data: any) => Promise<any>} mapFieldsToPayload
 * @property {Function=} onSuccess
 */
export function useItemForm({
  schema,
  mode = "create",
  collectionId,
  itemId,
  initialValues,
  mapFieldsToPayload = (data) => data,
  onSuccess,
}) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  const {
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = form;

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const submitHandler = handleSubmit(async (data) => {
    try {
      const payload = await mapFieldsToPayload(data);

      if (mode === "edit") {
        if (!itemId) throw new Error("شناسه آیتم نامعتبر است");

        await database.updateDocument({
          databaseId: DATABASE_ID,
          collectionId,
          documentId: itemId,
          data: payload,
        });
      } else {
        await database.createDocument({
          databaseId: DATABASE_ID,
          collectionId,
          documentId: ID.unique(),
          data: payload,
        });
      }

      toast.success(
        mode === "edit"
          ? "آیتم با موفقیت بروزرسانی شد"
          : "آیتم جدید با موفقیت اضافه شد",
      );

      if (mode === "create") {
        reset();
      }

      onSuccess?.();
    } catch (error) {
      if (error.code === 401) {
        toast.error("درسترسی رد شد");
        return;
      }
      toast.error(
        mode === "edit" ? "خطا در بروزرسانی آیتم" : "خطا در افزودن آیتم جدید",
      );
    }
  });

  return {
    ...form,
    errors,
    isSubmitting,
    isSubmitSuccessful,
    handleSubmit: submitHandler,
  };
}

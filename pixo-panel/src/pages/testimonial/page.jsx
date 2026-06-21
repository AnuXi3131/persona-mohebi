import { useState } from "react";
import { toast } from "react-toastify";
import { TableProvider } from "../../contexts";
import { useCollectionRows, useItemEditor } from "../../hooks";
import { TESTIMONIALS_ID, DATABASE_ID } from "../../services/appwrite";
import { database } from "../../services/appwrite/appwrite.config";
import ViewModal from "./view-modal";
import TestimonialView from "./testimonial-view";
import {
  mapTestimonialsDocsToRows,
  mapTestimonialsDocumentToInitialValues,
} from "./testimonials.mapper";
import {
  Empty,
  PageHeader,
  Table,
  TableContainer,
  TableHeader,
} from "../../components/ui";

function Testimonial() {
  const { rows, loading, setQueryLength, stopFetching, reloadRows } =
    useCollectionRows({
      collectionId: TESTIMONIALS_ID,
      mapFieldsToRows: mapTestimonialsDocsToRows,
    });

  const {
    isOpen,
    open,
    close,
    initialData,
    itemId,
    loading: viewLoading,
  } = useItemEditor({
    collectionId: TESTIMONIALS_ID,
    mapDocumentToInitialValues: mapTestimonialsDocumentToInitialValues,
  });

  const [approveLoading, setApproveLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);

  async function handleApprove() {
    if (!itemId) return;

    setApproveLoading(true);
    try {
      await database.updateDocument({
        databaseId: DATABASE_ID,
        collectionId: TESTIMONIALS_ID,
        documentId: itemId,
        data: {
          approved: true,
        },
      });
      toast.success("کامنت با موفقیت تایید شد");
      reloadRows();
      close();
    } catch (error) {
      if (error.code === 401) {
        toast.error("دسترسی رد شد");
        return;
      }
      toast.error("خطا در تایید کامنت");
    } finally {
      setApproveLoading(false);
    }
  }

  async function handleReject() {
    if (!itemId) return;

    setRejectLoading(true);
    try {
      await database.updateDocument({
        databaseId: DATABASE_ID,
        collectionId: TESTIMONIALS_ID,
        documentId: itemId,
        data: {
          approved: false,
        },
      });
      toast.success("نظر با موفقیت رد شد");
      reloadRows();
      close();
    } catch (error) {
      if (error.code === 401) {
        toast.error("دسترسی رد شد");
        return;
      }
      toast.error("خطا در رد نظر");
    } finally {
      setRejectLoading(false);
    }
  }

  return (
    <section>
      <PageHeader
        pageTitle={"نظرات کاربران"}
        title={"نظرات کاربران"}
        sub={"نظراتی که در موردتان ثبت شده را حذف یا رد کنید"}
      />

      <div className="container px-4">
        {rows.length ? (
          <TableProvider
            title="لیست نظرات"
            searchBy="نظرات"
            collectionId={TESTIMONIALS_ID}
            reloadRows={reloadRows}
            data={rows}
            loading={loading}
            setQueryLength={setQueryLength}
            stopFetching={stopFetching}
            onView={open}
            viewable={true}
          >
            <TableContainer className={"my-20"}>
              <TableHeader />
              <Table />
            </TableContainer>
          </TableProvider>
        ) : (
          <div className="mt-10">
            <Empty
              title={"هیچ نظری ثبت نشده"}
              description={"به محض ثبت اولین نظر در اینجا نمایش داده خواهد شد"}
            />
          </div>
        )}
      </div>

      <ViewModal
        open={isOpen}
        onClose={close}
        title="مشاهده نظر"
        description="نظر ثبت شده را میتوانید رد و یا تایید کنید"
        isLoading={viewLoading && !initialData}
        onApprove={handleApprove}
        onReject={handleReject}
        approveLoading={approveLoading}
        rejectLoading={rejectLoading}
      >
        {initialData && <TestimonialView data={initialData} />}
      </ViewModal>
    </section>
  );
}
export default Testimonial;

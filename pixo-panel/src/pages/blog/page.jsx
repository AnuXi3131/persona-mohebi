import { useRef } from "react";
import { BLOG_POST_ID } from "../../services/appwrite";
import { TableProvider } from "../../contexts";
import { useCollectionRows, useItemEditor } from "../../hooks";
import BlogForm from "./blog-form";
import {
  mapBlogDocsToRows,
  mapBlogDocumentToInitialValues,
} from "./blog.mappers";
import {
  EditModal,
  Empty,
  TableContainer,
  TableHeader,
  Table,
  PageHeader,
} from "../../components/ui";

function Blog() {
  const formRef = useRef(null);

  const { rows, loading, setQueryLength, stopFetching, reloadRows } =
    useCollectionRows({
      collectionId: BLOG_POST_ID,
      mapFieldsToRows: mapBlogDocsToRows,
    });

  const {
    isOpen,
    open,
    close,
    initialData,
    itemId,
    loading: editLoading,
  } = useItemEditor({
    collectionId: BLOG_POST_ID,
    mapDocumentToInitialValues: mapBlogDocumentToInitialValues,
  });

  return (
    <section>
      <PageHeader
        pageTitle={"وبلاگ"}
        title={"وبلاگ"}
        sub={"مقالات خود را ویرایش و یا اضافه کنید"}
      />
      <div className="container px-4">
        <BlogForm
          formRef={formRef}
          mode="create"
          onSuccess={reloadRows}
          idPrefix="blog-create"
        />

        {rows.length ? (
          <TableProvider
            title="لیست مقالات"
            searchBy="مقالات"
            collectionId={BLOG_POST_ID}
            reloadRows={reloadRows}
            data={rows}
            loading={loading}
            setQueryLength={setQueryLength}
            stopFetching={stopFetching}
            editable={true}
            onEdit={open}
          >
            <TableContainer className={"my-20"}>
              <TableHeader />
              <Table />
            </TableContainer>
          </TableProvider>
        ) : (
          <div className="mt-10">
            <Empty
              title={"هیچ مقاله‌ ای اضافه نشده"}
              description={
                "اولین مقاله خود را اضافه کنید و جداول را مشاهده کنید"
              }
              actionButton={true}
              onAction={() => formRef.current.scrollIntoView()}
            />
          </div>
        )}
      </div>

      <EditModal
        open={isOpen}
        onClose={close}
        title="ویرایش مقاله"
        description="مقادیر انتخاب شده را ویرایش کنید"
        isLoading={editLoading && !initialData}
      >
        {initialData && (
          <BlogForm
            mode="edit"
            itemId={itemId}
            initialData={initialData}
            onSuccess={() => {
              reloadRows();
              close();
            }}
            idPrefix="blog-edit"
          />
        )}
      </EditModal>
    </section>
  );
}
export default Blog;

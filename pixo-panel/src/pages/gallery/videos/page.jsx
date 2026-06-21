import { useRef } from "react";
import { GALLERY_VIDEOS_ID } from "../../../services/appwrite";
import { TableProvider } from "../../../contexts";
import { useCollectionRows, useItemEditor } from "../../../hooks";
import VideosForm from "./videos-form";
import {
  EditModal,
  Empty,
  TableContainer,
  TableHeader,
  Table,
} from "../../../components/ui";
import {
  mapVideosToRows,
  mapVideosDocumentToInitialValues,
} from "./videos.mappers";

function Videos() {
  const formRef = useRef(null);

  const { rows, loading, setQueryLength, stopFetching, reloadRows } =
    useCollectionRows({
      collectionId: GALLERY_VIDEOS_ID,
      mapFieldsToRows: mapVideosToRows,
    });

  const {
    isOpen,
    open,
    close,
    initialData,
    itemId,
    loading: editLoading,
  } = useItemEditor({
    collectionId: GALLERY_VIDEOS_ID,
    mapDocumentToInitialValues: mapVideosDocumentToInitialValues,
  });

  return (
    <section>
      <VideosForm
        formRef={formRef}
        mode="create"
        onSuccess={reloadRows}
        idPrefix="videos-create"
      />

      {rows.length ? (
        <TableProvider
          title="لیست ویدیو ها"
          searchBy="عنوان ویدیو"
          collectionId={GALLERY_VIDEOS_ID}
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
            title={"هیچ ویدیویی آپلود نشده"}
            description={"اولین ویدیو خود را آپلود کنید و جداول را مشاهده کنید"}
            actionButton={true}
            onAction={() => formRef.current.scrollIntoView()}
          />
        </div>
      )}

      <EditModal
        open={isOpen}
        onClose={close}
        title="ویرایش ویدیو"
        description="مقادیر انتخاب شده را ویرایش کنید"
        isLoading={editLoading && !initialData}
      >
        {initialData && (
          <VideosForm
            mode="edit"
            itemId={itemId}
            initialData={initialData}
            onSuccess={() => {
              reloadRows();
              close();
            }}
            idPrefix="videos-edit"
          />
        )}
      </EditModal>
    </section>
  );
}
export default Videos;

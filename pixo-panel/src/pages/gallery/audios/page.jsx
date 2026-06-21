import { useRef } from "react";
import { GALLERY_AUDIOS_ID } from "../../../services/appwrite";
import { TableProvider } from "../../../contexts";
import { useCollectionRows, useItemEditor } from "../../../hooks";
import AudiosForm from "./audios-form";
import {
  EditModal,
  Empty,
  TableContainer,
  TableHeader,
  Table,
} from "../../../components/ui";
import {
  mapAudiosToRows,
  mapAudiosDocumentToInitialValues,
} from "./audios.mappers";

function Audios() {
  const formRef = useRef(null);

  const { rows, loading, setQueryLength, stopFetching, reloadRows } =
    useCollectionRows({
      collectionId: GALLERY_AUDIOS_ID,
      mapFieldsToRows: mapAudiosToRows,
    });

  const {
    isOpen,
    open,
    close,
    initialData,
    itemId,
    loading: editLoading,
  } = useItemEditor({
    collectionId: GALLERY_AUDIOS_ID,
    mapDocumentToInitialValues: mapAudiosDocumentToInitialValues,
  });

  return (
    <section>
      <AudiosForm
        formRef={formRef}
        mode="create"
        onSuccess={reloadRows}
        idPrefix="audios-create"
      />

      {rows.length ? (
        <TableProvider
          title="لیست فایل های صوتی"
          searchBy="عنوان"
          collectionId={GALLERY_AUDIOS_ID}
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
            title={"هیچ فایل صوتی آپلود نشده"}
            description={
              "اولین فایل صوتی خود را آپلود کنید و جداول را مشاهده کنید"
            }
            actionButton={true}
            onAction={() => formRef.current.scrollIntoView()}
          />
        </div>
      )}

      <EditModal
        open={isOpen}
        onClose={close}
        title="ویرایش صوت"
        description="مقادیر انتخاب شده را ویرایش کنید"
        isLoading={editLoading && !initialData}
      >
        {initialData && (
          <AudiosForm
            mode="edit"
            itemId={itemId}
            initialData={initialData}
            onSuccess={() => {
              reloadRows();
              close();
            }}
            idPrefix="audios-edit"
          />
        )}
      </EditModal>
    </section>
  );
}
export default Audios;

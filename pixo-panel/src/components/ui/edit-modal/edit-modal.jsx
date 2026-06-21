import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
  Loader,
} from "..";

function EditModal({
  open,
  title,
  description,
  onClose,
  isLoading = false,
  children,
}) {
  return (
    <Dialog open={open} onOpenChange={(state) => !state && onClose?.()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <>
          {isLoading ? (
            <Loader text="در حال بارگذاری..." className="h-24" />
          ) : (
            <>{children}</>
          )}
        </>
        <DialogFooter>
          <DialogClose />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditModal;

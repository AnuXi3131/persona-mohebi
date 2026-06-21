import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogContent,
  DialogFooter,
  DialogClose,
  Loader,
  Button,
} from "../../components/ui";

function ViewModal({
  open,
  title,
  description,
  onClose,
  isLoading = false,
  children,
  onApprove,
  onReject,
  approveLoading = false,
  rejectLoading = false,
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
        <DialogFooter className="flex-row-reverse gap-2 pb-5">
          {onApprove && (
            <Button
              label="تایید"
              onClick={onApprove}
              loading={approveLoading}
            />
          )}
          {onReject && (
            <Button
              label="رد"
              varient="destructive"
              onClick={onReject}
              loading={rejectLoading}
            />
          )}
          <DialogClose />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ViewModal;

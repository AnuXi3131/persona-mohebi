import clsx from "clsx";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { allowedFileTypes } from "../../../schemas/allowedFileTypes";

/**
 *
 * @property {string} label
 * @property {string} accept
 * @property {string} name
 * @property {string} id
 * @property {boolean} disabled
 * @property {string} className
 * @property {Function} register
 * @property {string} error
 * @property {boolean} checked
 * @property {Function} onChange
 * @property {boolean} onReset
 * @property {number} uploadProgress
 */

function FileInput({
  label,
  accept,
  name,
  id,
  disabled,
  className,
  register,
  error,
  onChange,
  onReset,
  uploadProgress,
}) {
  const [fileName, setFileName] = useState("");
  const showProgress = typeof uploadProgress === "number";

  function handleFile(e, uploadType = "select") {
    let file;

    if (uploadType === "drop") {
      e.preventDefault();
      file = e.dataTransfer.files[0];
    } else {
      file = e.target.files[0];
    }

    if (file) {
      setFileName(file.name);
      if (onChange) onChange(file);
    }
  }

  function setBorder(e, active) {
    e.target.classList.toggle("border-primary", active);
  }

  useEffect(() => {
    if (onReset) setFileName("");
  }, [onReset]);

  return (
    <div className="text-left">
      <label
        htmlFor={id}
        disabled={disabled}
        tabIndex={0}
        className={clsx(
          "default-input flex-center hover:bg-accent text-muted-foreground grid cursor-pointer place-items-center gap-4 rounded-lg border-3 border-dashed px-2 py-4 active:scale-98",
          error && "border-destructive text-destructive",
          showProgress && "pointer-events-none opacity-80",
          className,
        )}
        onDrop={(e) => {
          handleFile(e, "drop");
          setBorder(e, false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setBorder(e, true);
        }}
        onDragEnd={(e) => {
          setBorder(e, false);
        }}
        onDragLeave={(e) => {
          setBorder(e, false);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById(id).click();
          }
        }}
      >
        {/*  */}
        <Upload />
        <span className="line-clamp-1 text-center select-none">
          {fileName || label}
        </span>
        {/*  */}
        <input
          type="file"
          accept={allowedFileTypes[accept].join(",")}
          name={name}
          id={id}
          disabled={disabled}
          hidden
          {...register?.(name)}
          onChange={(e) => handleFile(e)}
        />
      </label>
      {showProgress && (
        <div className="mt-3 space-y-1">
          <div className="bg-muted h-2 w-full rounded-full">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-200"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <span className="text-muted-foreground text-xs font-medium">
            در حال آپلود: {uploadProgress}٪
          </span>
        </div>
      )}
      {error && (
        <span className="text-destructive text-sm">{error.message}</span>
      )}
    </div>
  );
}
export default FileInput;

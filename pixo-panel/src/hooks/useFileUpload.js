import { useState } from "react";
import { uploadFile } from "../utils";

export function useFileUpload() {
  const [progress, setProgress] = useState({});
  const [fildId, setFileId] = useState({});

  const upload = async ({ file, prevId = "", key }) => {
    if (!key) throw new Error("key is missing");

    if (!file) {
      setProgress((prev) => ({ ...prev, [key]: null }));
      return prevId || null;
    }

    setProgress((prev) => ({ ...prev, [key]: null }));

    const newFileId = await uploadFile(file, prevId, (percent) => {
      setProgress((prev) => ({ ...prev, [key]: percent }));
    });

    setProgress((prev) => ({ ...prev, [key]: null }));
    setFileId((prev) => ({ ...prev, [key]: newFileId }));

    return newFileId;
  };

  return {
    progress,
    fildId,
    upload,
  };
}

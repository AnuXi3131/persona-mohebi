import { STORAGE_ID } from "../services/appwrite";
import { storage } from "../services/appwrite/appwrite.config";

export function getFileUrl(fileId) {
  if (!fileId) return null;
  return storage.getFileDownload({
    bucketId: STORAGE_ID,
    fileId,
  });
}

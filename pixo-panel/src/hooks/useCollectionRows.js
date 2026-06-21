import { useCallback, useEffect, useState } from "react";
import { database, Query } from "../services/appwrite/appwrite.config";
import { DATABASE_ID } from "../services/appwrite";

/**
 * @property {string} collectionId
 * @property {(docs: Array<any>) => Array<any>} mapFieldsToRows
 * @property {number} initialLimit
 */
export function useCollectionRows({
  collectionId,
  mapFieldsToRows = (docs) => docs,
  initialLimit = 5,
}) {
  const [rows, setRows] = useState([]);
  const [queryLength, setQueryLength] = useState(initialLimit);
  const [loading, setLoading] = useState(false);
  const [stopFetching, setStopFetching] = useState(false);

  const reloadRows = useCallback(async () => {
    setLoading(true);

    try {
      const response = await database.listDocuments({
        databaseId: DATABASE_ID,
        collectionId,
        queries: [Query.limit(queryLength), Query.orderDesc("$createdAt")],
      });

      const allRows = mapFieldsToRows(response.documents);
      setRows(allRows);
      setStopFetching(allRows.length === queryLength);
    } catch (error) {
      console.warn("can't load previous rows", error);
    } finally {
      setLoading(false);
    }
  }, [collectionId, mapFieldsToRows, queryLength]);

  useEffect(() => {
    reloadRows();
  }, [reloadRows]);

  return {
    rows,
    loading,
    queryLength,
    setQueryLength,
    stopFetching,
    reloadRows,
  };
}

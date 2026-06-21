import { DATABASE_ID } from "../appwrite";
import { database, Query } from "../appwrite/appwrite.config";

export async function getMedia({ collectionId, limit = 6, offset = 0 }) {
  try {
    const response = await database.listDocuments({
      databaseId: DATABASE_ID,
      collectionId,
      queries: [
        Query.limit(limit),
        Query.offset(offset),
        Query.orderDesc("$createdAt"),
      ],
    });

    return response.documents || [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

export function useInfiniteMedia(collectionId) {
  const limit = 6;
  let currentOffset = 0;
  let allData = [];
  let hasMore = true;
  let isLoading = false;

  async function fetchInitial() {
    if (isLoading) return;
    isLoading = true;
    const data = await getMedia({
      collectionId,
    });
    allData = data;
    currentOffset = data.length;
    hasMore = data.length === limit;
    isLoading = false;
    return allData;
  }

  async function fetchMore() {
    if (isLoading || !hasMore) return [];
    isLoading = true;
    const data = await getMedia({
      collectionId,
      limit,
      offset: currentOffset,
    });
    allData = [...allData, ...data];
    currentOffset += data.length;
    hasMore = data.length === limit;
    isLoading = false;
    return data;
  }

  return {
    getData: () => allData,
    fetchInitial,
    fetchMore,
    hasMore: () => hasMore,
    isLoading: () => isLoading,
  };
}

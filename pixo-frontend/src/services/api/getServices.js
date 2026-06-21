import { DATABASE_ID, SERVICES_ID } from "../appwrite";
import { database, Query } from "../appwrite/appwrite.config";

export async function getServices(queryLength) {
  try {
    const services = await database.listDocuments({
      databaseId: DATABASE_ID,
      collectionId: SERVICES_ID,
      queries: [Query.limit(queryLength), Query.orderDesc("$createdAt")],
    });

    return services.documents || [];
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

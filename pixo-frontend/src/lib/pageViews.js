import { database, Query, ID } from "../services/appwrite/appwrite.config";
import { DATABASE_ID, PAGE_VIEWS_ID } from "../services/appwrite";

async function trackView() {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const { ip } = await res.json();

    const now = Math.floor(Date.now() / 1000);
    const oneDayAgo = now - 24 * 60 * 60;

    const exsistIp = await database.listDocuments({
      databaseId: DATABASE_ID,
      collectionId: PAGE_VIEWS_ID,
      queries: [
        Query.equal("ip", ip),
        Query.greaterThan("timestamp", oneDayAgo),
      ],
    });

    if (exsistIp.documents.length === 0) {
      await database.createDocument({
        databaseId: DATABASE_ID,
        collectionId: PAGE_VIEWS_ID,
        documentId: ID.unique(),
        data: {
          ip,
          timestamp: now,
        },
      });
    }
  } catch (error) {
    console.error("Tracking error", error);
  }
}

export default trackView;

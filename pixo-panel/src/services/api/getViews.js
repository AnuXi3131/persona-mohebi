import { database, Query } from "../appwrite/appwrite.config";
import { DATABASE_ID, PAGE_VIEWS_ID } from "../appwrite";
/**
 *
 * @property {number} value
 * @returns {Array} return array of data with [day , viewCount]
 */
export async function getViews(value) {
  try {
    const now = Math.floor(Date.now() / 1000);
    const days = now - value * 24 * 60 * 60;

    const res = await database.listDocuments(DATABASE_ID, PAGE_VIEWS_ID, [
      Query.greaterThanEqual("timestamp", days),
      Query.lessThanEqual("timestamp", now),
    ]);

    const docs = res.documents || [];
    const grouped = {};

    docs.forEach((doc) => {
      const dateObj = new Date(doc.timestamp * 1000);
      const key = dateObj.toLocaleDateString("fa-IR", {
        month: "2-digit",
        day: "2-digit",
      });
      grouped[key] = (grouped[key] || 0) + 1;
    });

    const data = Array.from({ length: value + 1 }).map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (value - i));
      const key = d.toLocaleDateString("fa-IR", {
        month: "2-digit",
        day: "2-digit",
      });
      return {
        date: key,
        count: grouped[key] || 0,
      };
    });

    return data;
  } catch (err) {
    console.error("Error loading views", err);
    return [];
  }
}

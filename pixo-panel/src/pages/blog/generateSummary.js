import { GoogleGenAI } from "@google/genai";
import { toast } from "react-toastify";
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function generateSummary(content) {
  if (!content.trim()) {
    toast.error("محتوای مقاله خالی است");
    return;
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `این متن را در 100 تا 140 کاراکتر خلاصه کن. فقط متن خلاصه را بده. متن : ${content}`,
    });

    if (response.text) {
      toast.success("متن با موفقیت تولید شد");
      return response.text;
    }
  } catch {
    toast.error("خطا در تولید متن");
    return null;
  }
}
export default generateSummary;

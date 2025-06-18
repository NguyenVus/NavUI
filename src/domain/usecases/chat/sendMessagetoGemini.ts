import { callGeminiApi } from "@/infrastructure/gemini/geminiApi";

export const sendMessageToGemini = async (message: string, imageBase64?: string): Promise<string> => {
    try {
        return await callGeminiApi(message, imageBase64);
    } catch (error) {
        console.error("Gemini API error:", error);
        return "❌ Lỗi gọi API Gemini";
    }
};
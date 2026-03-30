import { GoogleGenAI } from "@google/genai";

// Initialize Gemini AI
// NOTE: process.env.GEMINI_API_KEY is injected by the environment
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY as string });

export const lumozaAIService = {
  /**
   * Calls the backend to log interaction and update trust score.
   */
  logInteraction: async (userId: string, message: string) => {
    try {
      const response = await fetch("/api/lumoza/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message }),
      });
      return await response.json();
    } catch (error) {
      console.error("Error logging LUMOZA interaction:", error);
      return null;
    }
  },

  /**
   * Calls Gemini API directly from the frontend for high-quality AI advice.
   */
  getAIAdvice: async (message: string) => {
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are LUMOZA, an expert agricultural AI assistant for African farmers. 
        Provide practical, sustainable, and culturally relevant advice for the following query: ${message}`,
      });
      return response.text;
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      return "I'm having trouble connecting to my AI core. Please try again later.";
    }
  },
};

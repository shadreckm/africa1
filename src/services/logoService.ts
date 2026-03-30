import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const generateLogo = async () => {
  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [
        {
          text: `A premium, iconic tech logo for "KULIMA AFRICA". 
          The design consists of a minimal geometric symbol and a modern sans-serif wordmark. 
          The symbol is a sophisticated abstraction combining a leaf (growth), a shield (trust), and a network of nodes (interconnected system). 
          The shape subtly hints at the silhouette of Africa through geometric negative space. 
          Colors: Deep Forest Green (#0B3D2E) and Gold (#D4A017). 
          Style: Flat design, clean lines, futuristic, minimal, global-standard, billionaire tech brand aesthetic like Stripe or Airbnb. 
          Presentation: Centered on a clean white background, professional brand reveal layout showing both the full logo (symbol + text) and the icon-only version. 
          High resolution, 4k, professional graphic design.`,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
        imageSize: "1K"
      },
    },
  });

  for (const part of response.candidates[0].content.parts) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

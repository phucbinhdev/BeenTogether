import { GoogleGenAI } from "@google/genai";
import { MODEL_NAMES } from "../constants";

// Helper to convert File/Blob to Base64 string (without data URL prefix for API)
export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = base64String.split(",")[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

// Helper for UI display (keeps the prefix)
export const fileToDataUrl = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const getAI = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey)
    throw new Error("GEMINI_API_KEY chưa được cấu hình trong file .env");
  return new GoogleGenAI({ apiKey });
};

/**
 * Analyzes an image using Gemini 3 Pro Preview
 */
export const analyzeImageContent = async (
  base64Image: string,
  mimeType: string,
  prompt: string,
) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAMES.ANALYZE_IMAGE,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          {
            text: prompt || "Describe this image in detail.",
          },
        ],
      },
    });
    return response.text;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};

/**
 * Edits an image using Gemini 2.5 Flash Image (Nano Banana)
 */
export const editImageContent = async (
  base64Image: string,
  mimeType: string,
  prompt: string,
) => {
  const ai = getAI();
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAMES.EDIT_IMAGE,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Image,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    let imageUrl: string | null = null;
    let text: string | null = null;

    if (response.candidates && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          imageUrl = `data:image/png;base64,${part.inlineData.data}`;
        } else if (part.text) {
          text = part.text;
        }
      }
    }

    return { imageUrl, text };
  } catch (error) {
    console.error("Error editing image:", error);
    throw error;
  }
};

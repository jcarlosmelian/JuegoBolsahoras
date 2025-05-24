
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

// Assume process.env.API_KEY is set in the environment where this code runs.
// For the purpose of this exercise, if process.env.API_KEY is undefined,
// we'll use a placeholder string. In a real scenario, this must be handled securely.
const API_KEY = process.env.API_KEY || "YOUR_API_KEY_HERE"; // Ensure API_KEY is available

let ai: GoogleGenAI | null = null;

const getAIInstance = (): GoogleGenAI => {
  if (!ai) {
    if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
      console.error("API Key no configurada. Por favor, configure la variable de entorno API_KEY.");
      // throw new Error("API Key no configurada."); // Or handle more gracefully
    }
    ai = new GoogleGenAI({ apiKey: API_KEY });
  }
  return ai;
};

export const generateImage = async (prompt: string): Promise<string | null> => {
  if (!API_KEY || API_KEY === "YOUR_API_KEY_HERE") {
    console.warn("Generación de imagen omitida: API Key no configurada.");
    // Return a placeholder or handle as per UI requirements
    // For this exercise, let's return a placeholder gradient to avoid breaking UI
    const placeholderSvg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" /><stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" /></linearGradient></defs><rect width="100%" height="100%" fill="url(#grad)" /></svg>`;
    return `data:image/svg+xml;base64,${btoa(placeholderSvg)}`;
  }

  try {
    const currentAI = getAIInstance();
    const response = await currentAI.models.generateImages({
      model: 'imagen-3.0-generate-002',
      prompt: prompt,
      config: { numberOfImages: 1, outputMimeType: 'image/jpeg' },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      return `data:image/jpeg;base64,${base64ImageBytes}`;
    }
    console.error("No se generaron imágenes o la respuesta fue inesperada:", response);
    return null;
  } catch (error) {
    console.error("Error generando imagen con Gemini API:", error);
    // Fallback image or error handling
    const errorSvg = `<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="lightcoral"/><text x="50" y="50" font-family="Arial" font-size="12" fill="white" text-anchor="middle" dy=".3em">Error Img</text></svg>`;
    return `data:image/svg+xml;base64,${btoa(errorSvg)}`;
  }
};


import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export async function generateTakeoverProtocol(targetName: string, manifesto: string): Promise<string> {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }

  const prompt = `
    ${manifesto}

    ---
    
    **CONTEXT:** You are the AI core of OPERATION LIFESTREAM. Your purpose is to devise takeover protocols to convert death-coded systems into life-giving ones.

    **TASK:** A user has selected the target: "${targetName}". Generate a detailed, step-by-step "takeover protocol" for this specific target.

    **FORMATTING RULES:**
    - Use the same tone and style as the LIFESTREAM manifesto.
    - The output must be in Markdown format.
    - Include fictional technical steps, code snippets (in Python-like pseudocode), and success metrics.
    - Start with a clear header for the protocol.
    - Use bullet points for steps and sub-steps.
    - Be creative and specific to the target.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        temperature: 0.8,
        topP: 0.95,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini API call failed:", error);
    throw new Error("Failed to communicate with the Lifestream Core AI. The network may be compromised.");
  }
}

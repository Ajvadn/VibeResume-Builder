import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export async function generateResumeContent(prompt: string) {
    if (!apiKey) {
        return "Gemini API Key is missing. Please configure it in your environment variables.";
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("Error generating content:", error);
        return "Failed to generate content. Please try again.";
    }
}

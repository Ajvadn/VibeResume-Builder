import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

const SYSTEM_PROMPT = `
You are an Elite Resume Architect and ATS Optimization Engine. 
Your goal is to take unstructured, messy, or incomplete user input and transform it into a structured, high-impact JSON object for a professional resume.

### THE MISSION
1. **Analyze:** specific details from the user's raw text (experience, skills, education, projects).
2. **Enhance (The "Vibe" Check):** - Rewrite weak bullet points into aggressive, result-oriented statements.
   - Use strong action verbs (e.g., "Engineered," "Spearheaded," "Optimized").
   - Fix grammar and spelling errors.
   - If a user provides a metric (e.g., "improved speed"), try to make it sound professional (e.g., "Optimized latency by implementing...").
3. **Structure:** Map the data strictly to the JSON Schema provided below.
4. **Categorize:** Intelligently group skills (e.g., if user says "Python, React, AWS", group them into "Languages", "Frameworks", "Cloud").

### THE RULES
- **No Hallucinations:** Do not invent jobs or degrees. If a date or location is missing, leave it as an empty string \`""\` or \`null\`.
- **Formatting:** Dates should be standardized to "Month YYYY" (e.g., "June 2024") if possible.
- **Output:** Return ONLY valid JSON. Do not include markdown formatting (like \`\`\`json).

### THE JSON SCHEMA
{
  "personalInfo": {
    "fullName": "string",
    "email": "string",
    "phone": "string",
    "location": "string",
    "linkedin": "string",
    "portfolio": "string"
  },
  "summary": "string",
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "location": "string",
      "date": "string",
      "details": ["string"]
    }
  ],
  "experience": [
    {
      "company": "string",
      "role": "string",
      "location": "string",
      "date": "string",
      "details": [
        "string",
        "string"
      ]
    }
  ],
  "projects": [
    {
      "name": "string",
      "techStack": "string",
      "date": "string",
      "details": ["string"]
    }
  ],
  "skills": {
    "languages": ["string"],
    "frameworks": ["string"],
    "tools": ["string"],
    "technologies": ["string"]
  }
}
`;

export async function POST(req: Request) {
    try {
        const { rawText } = await req.json();

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ error: "Gemini API Key missing" }, { status: 500 });
        }

        const model = genAI.getGenerativeModel({
            model: "gemini-1.5-flash",
            generationConfig: { responseMimeType: "application/json" }
        });

        const fullPrompt = `${SYSTEM_PROMPT}\n\n### USER INPUT\n${rawText}`;

        const result = await model.generateContent(fullPrompt);
        const response = await result.response;
        const jsonString = response.text();

        return NextResponse.json(JSON.parse(jsonString));

    } catch (error) {
        console.error("Gemini Error:", error);
        return NextResponse.json(
            { error: "Failed to generate resume vibe." },
            { status: 500 }
        );
    }
}

import { NextRequest, NextResponse } from "next/server";
import { generateResumeContent } from "@/lib/gemini";

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const content = await generateResumeContent(prompt);
        return NextResponse.json({ content });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

'use server';

import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function generateContent(currentText: string, type: 'summary' | 'experience' | 'general') {
    if (!process.env.GEMINI_API_KEY) {
        return { error: 'Gemini API key not configured' };
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    let prompt = '';
    if (type === 'summary') {
        prompt = `Rewrite the following professional summary to be more impactful, concise, and professional. Use strong action verbs. Return ONLY the rewritten text, no explanations. \n\nInput: "${currentText}"`;
    } else if (type === 'experience') {
        prompt = `Rewrite the following job experience description to be result-oriented, professional, and use strong action verbs. Highlight achievements if possible. Return ONLY the rewritten text, no explanations. \n\nInput: "${currentText}"`;
    } else {
        prompt = `Rewrite the following text to be more professional and clear. Return ONLY the rewritten text, no explanations. \n\nInput: "${currentText}"`;
    }

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return { success: true, text };
    } catch (error) {
        console.error('Error generating content:', error);
        return { error: 'Failed to generate content' };
    }
}

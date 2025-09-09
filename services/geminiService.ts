import { GoogleGenAI, Type } from "@google/genai";
import { Config, Paper, QuestionCounts } from "../types";

// Fix: Per coding guidelines, initialize GoogleGenAI with process.env.API_KEY.
// This resolves the error and aligns with the project's API key handling strategy.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const getResponseSchema = (counts: QuestionCounts) => {
    const properties: any = {};

    if (counts.mcqs > 0) {
        properties.mcqs = {
            type: Type.ARRAY,
            description: "Multiple Choice Questions",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The question text." },
                    options: { type: Type.ARRAY, items: { type: Type.STRING }, description: "An array of 4 possible options." },
                    answer: { type: Type.STRING, description: "The correct option text." }
                },
                required: ["question", "options", "answer"]
            }
        };
    }
    if (counts.shortAnswer > 0) {
        properties.shortAnswer = {
            type: Type.ARRAY,
            description: "Short answer questions (1-2 sentences).",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The question text." },
                    answer: { type: Type.STRING, description: "A brief, correct answer." }
                },
                required: ["question", "answer"]
            }
        };
    }
    if (counts.longAnswer > 0) {
        properties.longAnswer = {
            type: Type.ARRAY,
            description: "Long answer questions (requiring a detailed explanation).",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The question text." },
                    answer: { type: Type.STRING, description: "A detailed, correct answer." }
                },
                required: ["question", "answer"]
            }
        };
    }
    if (counts.fillInTheBlanks > 0) {
        properties.fillInTheBlanks = {
            type: Type.ARRAY,
            description: "Fill in the blank questions.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The sentence with a '_____' for the blank." },
                    answer: { type: Type.STRING, description: "The word that fills the blank." }
                },
                required: ["question", "answer"]
            }
        };
    }
    if (counts.trueFalse > 0) {
        properties.trueFalse = {
            type: Type.ARRAY,
            description: "True or False questions.",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The statement to be evaluated." },
                    answer: { type: Type.BOOLEAN, description: "True or false." }
                },
                required: ["question", "answer"]
            }
        };
    }

    return {
        type: Type.OBJECT,
        properties
    };
}


export const generateQuestions = async (config: Config, counts: QuestionCounts): Promise<Paper> => {
    const prompt = `
      Generate a question paper with the following specifications:
      - Board: Gujarat State Education Board (GSEB)
      - Standard: ${config.standard}
      - Subject: ${config.subject}
      - Medium: ${config.medium}
      - Chapter(s): "${config.chapter.join(', ')}"
      - Difficulty Level: ${config.difficulty}

      Generate the exact number of questions for each type as specified below:
      - Multiple Choice Questions: ${counts.mcqs} (with 4 options each)
      - Short Answer Questions: ${counts.shortAnswer}
      - Long Answer Questions: ${counts.longAnswer}
      - Fill in the Blanks: ${counts.fillInTheBlanks} (use '_____' to denote the blank)
      - True/False Questions: ${counts.trueFalse}

      Ensure all questions are strictly relevant to the specified chapter(s) and difficulty. If multiple chapters are listed, distribute the questions among them.
    `;
    
    const responseSchema = getResponseSchema(counts);

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: responseSchema,
        },
    });

    try {
        const jsonText = response.text.trim();
        const parsedJson = JSON.parse(jsonText);
        return parsedJson as Paper;
    } catch (e) {
        console.error("Failed to parse JSON response:", response.text);
        throw new Error("The AI returned an invalid response format.");
    }
};
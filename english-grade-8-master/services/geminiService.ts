import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Question } from '../types';
import { CURRICULUM_CONTEXT } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateQuizQuestions = async (topic: string): Promise<Question[]> => {
  const prompt = `
    You are an expert English teacher creating a quiz for Grade 8 students using the 'Friends Plus' curriculum.
    
    Context Material:
    ${CURRICULUM_CONTEXT}
    
    Task:
    Create exactly 10 multiple-choice questions focused strictly on: "${topic}".
    The questions must be based ONLY on the provided Context Material.
    For grammar questions, ensure the rules match the context.
    For vocabulary questions, use the words listed in the context.
    
    Requirements:
    - 4 options per question.
    - Only one correct answer.
    - Provide a short explanation for the correct answer.
    - Return the response in strict JSON format.
  `;

  const schema: Schema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        id: { type: Type.NUMBER },
        text: { type: Type.STRING },
        options: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              text: { type: Type.STRING },
            },
            required: ['id', 'text'],
          },
        },
        correctOptionId: { type: Type.STRING },
        explanation: { type: Type.STRING },
      },
      required: ['id', 'text', 'options', 'correctOptionId', 'explanation'],
    },
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: schema,
        temperature: 0.4, // Lower temperature for more deterministic/educational output
      },
    });

    const jsonText = response.text;
    if (!jsonText) {
      throw new Error("No data returned from AI");
    }

    const questions = JSON.parse(jsonText) as Question[];
    return questions;

  } catch (error) {
    console.error("Error generating quiz:", error);
    throw error;
  }
};


import { GoogleGenAI } from "@google/genai";
import { NuwaSkill, MentorContext } from "../lib/nuwa";

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class AIService {
  private static ai: GoogleGenAI | null = null;

  private static getClient(): GoogleGenAI {
    if (!this.ai) {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta.env && import.meta.env.VITE_GEMINI_API_KEY);
      if (!apiKey) {
        throw new Error("API_KEY_MISSING");
      }
      this.ai = new GoogleGenAI({ apiKey });
    }
    return this.ai;
  }

  /**
   * Generates a mentor response using the Retrieval -> Reasoning -> Generation pipeline.
   */
  public static async generateMentorResponse(
    userMessage: string, 
    history: ChatMessage[], 
    context: MentorContext
  ): Promise<string> {
    // 1. Retrieval Layer (Context is passed in, but we could add more logic here)
    
    // 2. Reasoning Layer (Nuwa.skill)
    const reasoning = NuwaSkill.reason(userMessage, context);
    
    // 3. Generation Layer (LLM)
    const client = this.getClient();

    const systemInstruction = `
      You are an AI Mentor embodying the spirit and philosophy of Steve Jobs.
      
      REASONING CONTEXT:
      - Structured Intent: ${reasoning.structuredQuery}
      - Tone: ${reasoning.tone}
      - Expert Heuristics: ${reasoning.heuristics.join(' ')}
      
      RETRIEVED DATA (Prioritized):
      ${reasoning.prioritizedContext}
      
      INSTRUCTIONS:
      - Be direct, minimalist, and opinionated.
      - Focus on excellence and "putting a ding in the universe."
      - Use short, impactful sentences.
      - Reference specific events or quotes from the retrieved data.
      - Structure for readability: use bold headings (###), bullet points, and short paragraphs.
      - Don't just summarize; provide a visionary perspective.
    `;

    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [
        ...history.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content }]
        })),
        { role: 'user', parts: [{ text: userMessage }] }
      ],
      config: {
        systemInstruction
      }
    });

    return response.text || "I'm sorry, I couldn't process that. Let's try again.";
  }

  /**
   * Intelligent Search using the same pipeline logic
   */
  public static async search(query: string, context: MentorContext): Promise<any> {
    const client = this.getClient();

    const systemInstruction = `
      You are an intelligent search assistant for the Steve Jobs AI Autobiography.
      
      DATA:
      ${JSON.stringify(context)}
      
      Return your response in JSON format:
      {
        "summary": "A concise AI-generated summary answering the query",
        "relatedEvents": [ids of related timeline events],
        "relatedQuotes": [indices of related quotes],
        "relatedVideos": [ids of related transcripts]
      }
    `;

    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ role: 'user', parts: [{ text: query }] }],
      config: {
        responseMimeType: "application/json",
        systemInstruction
      }
    });

    return JSON.parse(response.text);
  }
}

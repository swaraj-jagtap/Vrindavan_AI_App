// app/api/ai/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ reply: "Please enter a message." });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const result = await model.generateContent(message);
    const reply = result?.response?.text?.() || "No response from Gemini.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { reply: "Error: Unable to connect to AI service." },
      { status: 500 }
    );
  }
}

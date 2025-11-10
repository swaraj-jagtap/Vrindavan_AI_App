// app/api/vrindavan/route.ts
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-preview-09-2025",
});

// In-memory chat history (temporary — use DB later)
let conversationHistory: { role: "user" | "ai"; text: string }[] = [];

// Helper: format chat history for context
function formatHistory(history: { role: string; text: string }[]) {
  return history
    .map((h) => `${h.role === "user" ? "👤 User" : "🤖 Vrindavan"}: ${h.text}`)
    .join("\n");
}

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";
    let message = "";
    let image: File | null = null;

    // 🧭 Detect request type
    if (contentType.includes("application/json")) {
      const body = await req.json();
      message = body.message;
    } else if (contentType.includes("multipart/form-data")) {
      const data = await req.formData();
      image = data.get("image") as File;
    }

    // 🌿 IMAGE ANALYSIS
    if (image) {
      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = buffer.toString("base64");
      const mimeType = image.type;

      conversationHistory.push({
        role: "user",
        text: "📸 Uploaded a plant image for analysis.",
      });

      const plantPrompt = `
You are Vrindavan, a kind and wise plant-care expert.
Use context from previous chat if helpful.
Analyze this plant image and reply briefly using Markdown.
Include:
1. **Plant Identification**
2. **Health Status**
3. **Probable Cause / Disease**
4. **Treatment Tip**
Keep tone friendly and answer concise.
`;

      const result = await model.generateContent([
        { text: plantPrompt },
        { inlineData: { mimeType, data: base64Image } },
        { text: formatHistory(conversationHistory) },
      ]);

      const reply = result?.response?.text?.() || "⚠️ No analysis result.";

      conversationHistory.push({ role: "ai", text: reply });

      // keep history short
      if (conversationHistory.length > 12) {
        conversationHistory = conversationHistory.slice(-12);
      }

      // 🔥 Return both keys (for chat + analyzer)
      return NextResponse.json({ reply, result: reply });
    }

    // 💬 TEXT CHAT
    if (message) {
      conversationHistory.push({ role: "user", text: message });

      const prompt = `
You are Vrindavan, a friendly AI botanist.
Use full chat context to answer naturally and helpfully.
Keep replies short, kind, and context-aware.
Here’s the conversation so far:
${formatHistory(conversationHistory)}
`;

      const result = await model.generateContent([{ text: prompt }]);
      const reply = result?.response?.text?.() || "🤖 No response from Vrindavan.";

      conversationHistory.push({ role: "ai", text: reply });

      // limit history
      if (conversationHistory.length > 12) {
        conversationHistory = conversationHistory.slice(-12);
      }

      return NextResponse.json({ reply, result: reply });
    }

    // 🪴 No input provided
    return NextResponse.json({ reply: "Please send a message or image." });
  } catch (error: any) {
    console.error("Vrindavan Error:", error);
    return NextResponse.json(
      { reply: "❌ Error connecting to Vrindavan AI service." },
      { status: 500 }
    );
  }
}

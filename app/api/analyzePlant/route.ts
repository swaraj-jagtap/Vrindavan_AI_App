import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const image = data.get("image") as File;

    if (!image) {
      return new Response(JSON.stringify({ error: "No image provided" }), { status: 400 });
    }

    // Convert image to base64
    const arrayBuffer = await image.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString("base64");

    // Send image to Gemini for plant analysis
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
You are a plant expert botanist.
Analyze this plant image briefly and give a short response in under 5 lines.
Include only:
1. Plant name (common & scientific)
2. Health status (Healthy / Diseased)
3. One probable cause or disease
4. One short treatment tip
Keep the answer concise and easy to read.
`;


    const result = await model.generateContent([
      {
        inlineData: {
          mimeType: image.type,
          data: base64Image,
        },
      },
      { text: prompt },
    ]);

    const responseText = result.response.text();

    return new Response(JSON.stringify({ result: responseText }), { status: 200 });
  } catch (error: any) {
    console.error("AnalyzePlant Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

// import { GoogleGenerativeAI } from "@google/generative-ai";

// // Initialize the Gemini AI client
// // Ensure you have GEMINI_API_KEY in your .env file
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
// const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-09-2025" });

// // The specific prompt for plant analysis
// const plantPrompt = `
// You are a plant expert botanist.
// Analyze this plant image briefly and give a short response.
// Format the response clearly using markdown **bolding** for headers.
// Include only:
// 1.  **Plant Identification:** (Common & Scientific name, if possible).
// 2.  **Health Status:** (e.g., Healthy, Stressed, Diseased).
// 3.  **Probable Cause/Disease:** (One probable cause or disease, if not healthy).
// 4.  **Treatment Tip:** (One short, actionable treatment tip).

// If the image is not a plant, kindly state that.
// Keep the entire answer concise and easy to read.
// `;

// export async function POST(req: Request) {
//   try {
//     // 1. Get image from FormData
//     const data = await req.formData();
//     const image = data.get("image") as File;

//     if (!image) {
//       return new Response(JSON.stringify({ error: "No image provided" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }

//     // 2. Convert image to base64
//     const arrayBuffer = await image.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);
//     const base64Image = buffer.toString("base64");
//     const mimeType = image.type;

//     // 3. Send image to Gemini for analysis
//     const result = await model.generateContent([
//       {
//         inlineData: {
//           mimeType: mimeType,
//           data: base64Image,
//         },
//       },
//       { text: plantPrompt },
//     ]);

//     const responseText = result.response.text();

//     // 4. Return the successful response
//     return new Response(JSON.stringify({ result: responseText }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });

//   } catch (error: any) {
//     console.error("AnalyzePlant Error:", error);
//     return new Response(JSON.stringify({ error: error.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
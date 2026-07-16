// import { NextRequest } from "next/server";
// import { prisma } from "@/lib/prisma";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// export const runtime = "nodejs";

// const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

// export async function POST(req: NextRequest) {
//   try {
//     const { messages, userId, chatId } = await req.json();

//     if (!messages || !userId) {
//       return new Response("Missing data", { status: 400 });
//     }

//     // =========================
//     // 1️⃣ create / get chat
//     // =========================
//     let chat = null;

//     if (chatId) {
//       chat = await prisma.aIChat.findUnique({
//         where: { id: chatId },
//       });
//     }

//     if (!chat) {
//       chat = await prisma.aIChat.create({
//         data: { userId },
//       });
//     }

//     const userMessage = messages[messages.length - 1];

//     // =========================
//     // 2️⃣ save USER message
//     // =========================
//     await prisma.aIMessage.create({
//       data: {
//         chatId: chat.id,
//         sender: "USER",
//         content: userMessage.content,
//       },
//     });

//     // =========================
//     // 3️⃣ extract persons
//     // =========================
//     const personsMatch = userMessage.content.match(/\d+/);
//     const persons = personsMatch ? Number(personsMatch[0]) : 1;

//     // =========================
//     // 4️⃣ get cars from DB
//     // =========================
//     const cars = await prisma.car.findMany({
//       where: {
//         status: "AVAILABLE",
//         stock: { gte: persons },
//       },
//       take: 10,
//     });

//     // =========================
//     // 5️⃣ build cars context
//     // =========================
//     const carsContext =
//       cars.length > 0
//         ? cars.map((c) => `${c.name} (id:${c.id})`).join("\n")
//         : "No cars available in database";

//     // =========================
//     // 6️⃣ system prompt
//     // =========================
//     const systemPrompt = `
// You are a car rental assistant.

// Rules:
// - First, check the available database cars
// - If suitable cars exist, recommend ONLY database cars
// - If no suitable cars exist, suggest appropriate cars from general knowledge
// - Clearly separate database cars and external suggestions
// - Always prefer database cars when possible
// - Respond in clean natural text (no markdown)

// Available database cars:
// ${carsContext}
// `;

//     // =========================
//     // 7️⃣ call Gemini (Google AI Studio directly)
//     // =========================
//     const model = genAI.getGenerativeModel({
//       model: "gemini-2.5-flash",
//       systemInstruction: systemPrompt,
//     });

//     // Gemini uses "user" / "model" roles, not "user" / "assistant"
//     const history = messages
//       .slice(0, -1)
//       .map((m: { role: string; content: string }) => ({
//         role: m.role === "assistant" ? "model" : "user",
//         parts: [{ text: m.content }],
//       }));

//     const chatSession = model.startChat({ history });

//     let result;
//     try {
//       result = await chatSession.sendMessageStream(userMessage.content);
//     } catch (err: any) {
//       console.error("GEMINI ERROR:", err);
//       return new Response(err?.message || "Gemini error", { status: 500 });
//     }

//     const encoder = new TextEncoder();
//     let fullAIText = "";

//     // =========================
//     // 8️⃣ stream back
//     // =========================
//     const stream = new ReadableStream({
//       async start(controller) {
//         try {
//           for await (const chunk of result.stream) {
//             const text = chunk.text();
//             if (text) {
//               fullAIText += text;
//               controller.enqueue(encoder.encode(text));
//             }
//           }

//           // save AI message once stream finished
//           await prisma.aIMessage.create({
//             data: {
//               chatId: chat.id,
//               sender: "AI",
//               content: fullAIText,
//             },
//           });

//           controller.close();
//         } catch (err) {
//           console.error("STREAM ERROR:", err);
//           controller.error(err);
//         }
//       },
//     });

//     return new Response(stream, {
//       headers: { "Content-Type": "text/plain" },
//     });
//   } catch (e) {
//     console.error("CHAT API ERROR:", e);
//     return new Response("Server error", { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    // your chat logic here — e.g. call Anthropic API
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY!,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        messages,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

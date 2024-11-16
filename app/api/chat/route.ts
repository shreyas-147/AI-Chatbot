import { NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
});

export async function POST(req: Request) {
  if (!process.env.NEXT_PUBLIC_GROQ_API_KEY) {
    return NextResponse.json(
      { error: "Groq API key not configured" },
      { status: 500 }
    );
  }

  try {
    const { messages } = await req.json();

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful and friendly AI assistant. Provide clear and concise responses.",
        },
        ...messages,
      ],
      model: "llama3-8b-8192",
      temperature: 0.2,
      max_tokens: 500,
    });

    return NextResponse.json({
      message: completion.choices[0]?.message?.content || "No response generated",
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  }
}
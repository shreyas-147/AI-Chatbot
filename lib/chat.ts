import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true, // Enable client-side usage
});

export async function sendMessage(content: string) {
  if (!process.env.NEXT_PUBLIC_GROQ_API_KEY) {
    throw new Error("Groq API key not configured");
  }

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are a helpful and friendly AI assistant. Provide clear and concise responses.",
        },
        { role: "user", content },
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 500,
    });

    return {
      message: completion.choices[0]?.message?.content || "No response generated",
    };
  } catch (error) {
    console.error("Chat Error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to send message"
    );
  }
}
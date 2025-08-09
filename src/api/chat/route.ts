import { NextResponse } from "next/server";
import { sendToAgent } from "@/lib/agent";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const data = await sendToAgent(message);

    return NextResponse.json({ reply: data.choices?.[0]?.message?.content ?? "" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import { sendToAgent } from "@/lib/agent";

// Input sanitization function
function sanitizeInput(input: string): string {
  return input
    .replace(/<[^>]*>/g, '') 
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/&lt;script&gt;/gi, '')
    .replace(/&lt;\/script&gt;/gi, '')
    .trim()
    .slice(0, 2000); // Limit input length
}

// Response sanitization function
function sanitizeResponse(response: string): string {
  return response
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, '')
    .replace(/javascript:/gi, '') 
    .replace(/on\w+\s*=/gi, '')
    .replace(/data:text\/html/gi, '')
    .trim();
}

export async function POST(req: Request) {
  try {
    // Parse and validate request
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: "Valid message is required" }, 
        { status: 400 }
      );
    }

    // Sanitize input
    const sanitizedMessage = sanitizeInput(message);
    
    if (!sanitizedMessage) {
      return NextResponse.json(
        { error: "Message cannot be empty after sanitization" }, 
        { status: 400 }
      );
    }

    // Send to agent
    const data = await sendToAgent(sanitizedMessage);

    // Sanitize response
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      data.choices[0].message.content = sanitizeResponse(data.choices[0].message.content);
    }

    // Return sanitized response
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API Error:", error);
    
    // Don't expose internal error details to client
    const errorMessage = error.message?.includes('Invalid access token') 
      ? "Authentication failed. Please check your configuration."
      : "I'm having trouble processing your request right now. Please try again.";

    return NextResponse.json(
      { error: errorMessage }, 
      { status: 500 }
    );
  }
}
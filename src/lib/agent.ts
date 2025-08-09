import axios from "axios";

export async function sendToAgent(message: string) {
  const AGENT_ENDPOINT = process.env.AGENT_ENDPOINT; // e.g., https://<agent-id>.ondigitalocean.app
  const AGENT_ACCESS_KEY = process.env.AGENT_ACCESS_KEY;

  if (!AGENT_ENDPOINT || !AGENT_ACCESS_KEY) {
    throw new Error("Missing AGENT_ENDPOINT or AGENT_ACCESS_KEY env vars");
  }

  try {
    const res = await axios.post(
      `${AGENT_ENDPOINT}/api/v1/chat/completions`,
      {
        messages: [{ role: "user", content: message }],
        stream: false,
        include_functions_info: false,
        include_retrieval_info: false,
        include_guardrails_info: false,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${AGENT_ACCESS_KEY}`,
        },
      }
    );

    return res.data;
  } catch (err: any) {
    console.error("Agent API error:", err.response?.data || err.message);
    throw new Error("Agent request failed");
  }
}

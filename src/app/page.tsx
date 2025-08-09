import ChatWindow from "@/components/ChatWindow";

export default function HomePage() {
  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-4">My DigitalOcean Agent Chatbot</h1>
      <ChatWindow />
    </main>
  );
}

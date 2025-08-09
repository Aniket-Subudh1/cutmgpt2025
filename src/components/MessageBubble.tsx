export default function MessageBubble({
  role,
  content
}: {
  role: string;
  content: string;
}) {
  const isUser = role === "user";
  return (
    <div
      className={`mb-2 p-2 rounded-lg max-w-xs ${
        isUser ? "bg-blue-500 text-white self-end ml-auto" : "bg-gray-200"
      }`}
    >
      {content}
    </div>
  );
}

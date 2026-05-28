import { TopicSidebar } from "@/components/TopicSidebar";
import { ChatWindow } from "@/components/ChatWindow";

export default function ChatPage() {
  return (
    <main className="h-screen grid grid-cols-[320px_1fr]">
      <TopicSidebar />
      <ChatWindow />
    </main>
  );
}

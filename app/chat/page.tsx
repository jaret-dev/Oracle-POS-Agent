import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";
import { TopicSidebar } from "@/components/TopicSidebar";
import { ChatWindow } from "@/components/ChatWindow";

export default async function ChatPage() {
  const session = await auth();
  // No edge middleware anymore: this server-side check is the gate for /chat.
  if (!session) redirect("/login");
  const user = session.user;

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <main className="h-screen grid grid-cols-[320px_1fr]">
      <TopicSidebar
        user={{
          name: user.name ?? user.username,
          role: user.role,
          storeNumber: user.storeNumber,
        }}
        signOutAction={signOutAction}
      />
      <ChatWindow user={{ id: user.id, role: user.role }} />
    </main>
  );
}

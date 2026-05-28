import { auth, signOut } from "@/auth";
import { TopicSidebar } from "@/components/TopicSidebar";
import { ChatWindow } from "@/components/ChatWindow";

export default async function ChatPage() {
  const session = await auth();
  const user = session?.user;

  async function signOutAction() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <main className="h-screen grid grid-cols-[320px_1fr]">
      <TopicSidebar
        user={
          user
            ? {
                name: user.name ?? user.username,
                role: user.role,
                storeNumber: user.storeNumber,
              }
            : null
        }
        signOutAction={signOutAction}
      />
      <ChatWindow user={user ? { id: user.id, role: user.role } : null} />
    </main>
  );
}

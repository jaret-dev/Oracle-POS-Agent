import { redirect } from "next/navigation";
import { auth } from "@/auth";

// Force dynamic so the redirect runs at request time in the Node runtime,
// rather than being baked into a static page (which Next 16 + Vercel was
// serving as a 404).
export const dynamic = "force-dynamic";

export default async function Index() {
  const session = await auth();
  redirect(session ? "/chat" : "/login");
}

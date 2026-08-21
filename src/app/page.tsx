import { redirect } from "next/navigation";
import { getCurrentUserSession } from "@/lib/auth/session";

export default async function HomePage() {
  const session = await getCurrentUserSession();

  if (session && (session.profile?.role === "SUPER_ADMIN" || session.profile?.role === "ADMIN" || session.profile?.role === "MODERATOR")) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}

import { getCurrentUserSession } from "@/lib/auth/session";
import LandingPageClient from "@/components/landing/LandingPageClient";

export default async function HomePage() {
  const session = await getCurrentUserSession();
  const isLoggedIn = !!(session && session.profile);

  return <LandingPageClient isLoggedIn={isLoggedIn} />;
}

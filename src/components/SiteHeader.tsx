import { Link, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { Gamepad2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { supabase } from "@/integrations/supabase/client";

export function SiteHeader() {
  const { user, loading } = useSession();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/" className="flex items-center gap-2">
          <Gamepad2 className="size-5 text-primary" />
          <span className="font-display text-lg font-extrabold uppercase tracking-[0.2em]">
            Tech Doctor
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          {!loading && user ? (
            <>
              <Button asChild variant="outlineGlow" size="sm">
                <Link to="/mitglieder">Mitgliederbereich</Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut /> Abmelden
              </Button>
            </>
          ) : (
            <Button asChild variant="hero" size="sm">
              <Link to="/auth">Anmelden</Link>
            </Button>
          )}
        </nav>
      </div>
    </header>
  );
}
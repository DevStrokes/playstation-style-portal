import { useEffect, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Gamepad2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { useSession } from "@/hooks/useSession";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Anmelden — Tech Doctor Play" },
      {
        name: "description",
        content:
          "Melde dich bei Tech Doctor Play an: mit E-Mail, Google oder Apple — und betritt den Mitgliederbereich.",
      },
      { property: "og:title", content: "Anmelden — Tech Doctor Play" },
      {
        property: "og:description",
        content: "Login mit E-Mail, Google oder Apple für den Tech Doctor Mitgliederbereich.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useSession();

  useEffect(() => {
    if (!loading && user) navigate({ to: "/mitglieder", replace: true });
  }, [loading, user, navigate]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    try {
      if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/mitglieder", replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        if (data.session) navigate({ to: "/mitglieder", replace: true });
        else toast.success("Fast geschafft — bitte bestätige deine E-Mail.");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Anmeldung fehlgeschlagen.");
    } finally {
      setBusy(false);
    }
  }

  async function handleOAuth(provider: "google" | "apple") {
    setBusy(true);
    const result = await lovable.auth.signInWithOAuth(provider, {
      redirect_uri: window.location.origin,
    });
    if (result.error) {
      setBusy(false);
      toast.error("Login mit " + provider + " fehlgeschlagen.");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/mitglieder", replace: true });
  }

  return (
    <div className="hero-surface flex min-h-screen items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <Gamepad2 className="size-5 text-primary" />
          <span className="font-display text-lg font-extrabold uppercase tracking-[0.3em]">
            Tech Doctor
          </span>
        </Link>

        <div className="glass-panel rounded-3xl p-8">
          <h1 className="text-2xl font-bold">
            {mode === "login" ? "Willkommen zurück" : "Konto erstellen"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Melde dich an, um den Mitgliederbereich zu betreten.
          </p>

          <div className="mt-6 grid gap-3">
            <Button variant="social" size="lg" disabled={busy} onClick={() => handleOAuth("google")}>
              Weiter mit Google
            </Button>
            <Button variant="social" size="lg" disabled={busy} onClick={() => handleOAuth("apple")}>
              Weiter mit Apple
            </Button>
          </div>

          <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> oder <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="du@beispiel.de"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                required
                minLength={6}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" variant="hero" size="lg" disabled={busy}>
              {busy ? <Loader2 className="animate-spin" /> : null}
              {mode === "login" ? "Anmelden" : "Registrieren"}
            </Button>
          </form>

          <button
            type="button"
            onClick={() => setMode(mode === "login" ? "signup" : "login")}
            className="mt-6 w-full text-sm text-muted-foreground transition-colors hover:text-primary"
          >
            {mode === "login"
              ? "Noch kein Konto? Jetzt registrieren"
              : "Bereits Mitglied? Zum Login"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm">
          <Link to="/" className="text-muted-foreground hover:text-primary">
            Ohne Anmeldung weiterstöbern
          </Link>
        </p>
      </div>
    </div>
  );
}
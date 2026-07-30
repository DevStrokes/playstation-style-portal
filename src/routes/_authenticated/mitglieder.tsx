import { createFileRoute } from "@tanstack/react-router";
import { Crown, Download, Trophy, Users } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { useSession } from "@/hooks/useSession";

export const Route = createFileRoute("/_authenticated/mitglieder")({
  head: () => ({
    meta: [
      { title: "Mitgliederbereich — NEXUS Play" },
      {
        name: "description",
        content: "Exklusive Inhalte, Trophäen und Downloads für NEXUS Play Mitglieder.",
      },
      { property: "og:title", content: "Mitgliederbereich — NEXUS Play" },
      {
        property: "og:description",
        content: "Exklusive Inhalte, Trophäen und Downloads für Mitglieder.",
      },
    ],
  }),
  component: MembersArea,
});

const perks = [
  { icon: Crown, title: "Early Access", text: "Spiele Betas und Demos vor allen anderen." },
  { icon: Download, title: "Exklusive Downloads", text: "Skins, Soundtracks und Wallpapers." },
  { icon: Trophy, title: "Trophäen-Boost", text: "Doppelte Punkte an Wochenenden." },
  { icon: Users, title: "Private Lobbys", text: "Eigene Server für dich und deine Crew." },
];

function MembersArea() {
  const { user } = useSession();
  const name = user?.user_metadata?.full_name ?? user?.email ?? "Spieler";

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-16">
        <span className="inline-flex items-center rounded-full border border-primary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Mitgliederbereich
        </span>
        <h1 className="mt-6 text-4xl font-extrabold md:text-5xl">
          Willkommen, <span className="text-gradient-blue">{name}</span>
        </h1>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Dieser Bereich ist geschützt und nur für angemeldete Mitglieder sichtbar.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map(({ icon: Icon, title, text }) => (
            <article key={title} className="glass-panel rounded-2xl p-6">
              <Icon className="size-6 text-accent" />
              <h2 className="mt-4 text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>

        <div className="glass-panel mt-8 rounded-2xl p-6">
          <h2 className="text-lg font-semibold">Dein Profil</h2>
          <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">E-Mail</dt>
              <dd>{user?.email ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">Mitglied seit</dt>
              <dd>
                {user?.created_at ? new Date(user.created_at).toLocaleDateString("de-DE") : "—"}
              </dd>
            </div>
          </dl>
        </div>
      </main>
    </div>
  );
}
import { createFileRoute, Link } from "@tanstack/react-router";
import { Zap, ShieldCheck, Gamepad2, Wrench, Cpu, BatteryCharging } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/SiteHeader";
import { Reviews } from "@/components/Reviews";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tech Doctor Play — Gaming Hub im Konsolen-Look" },
      {
        name: "description",
        content:
          "Tech Doctor Play ist der Gaming-Hub mit Bibliothek, Trophäen und geschütztem Mitgliederbereich. Anmeldung optional — per Klick.",
      },
      { property: "og:title", content: "Tech Doctor Play — Gaming Hub im Konsolen-Look" },
      {
        property: "og:description",
        content: "Bibliothek, Trophäen und exklusiver Mitgliederbereich. Anmeldung per Klick.",
      },
    ],
  }),
  component: Index,
});

const services = [
  {
    icon: Gamepad2,
    title: "Stickdrift Reparatur",
    price: "30 €",
    text: "Professionelle Stickdrift-Reparatur für DualSense & DualShock – mit hochwertigen TMR-Sticks für dauerhafte Präzision.",
  },
  {
    icon: Wrench,
    title: "Knöpfe / Tasten Reparatur",
    price: "19 €",
    text: "Defekte oder klebrige Tasten auf deinem Controller werden professionell repariert oder ausgetauscht.",
  },
  {
    icon: Zap,
    title: "Trigger Reparatur",
    price: "15 €",
    text: "L1, L2, R1, R2 – defekte oder klemmende Trigger werden schnell und zuverlässig repariert.",
  },
  {
    icon: Cpu,
    title: "Umbauten / Modding",
    price: "Auf Anfrage",
    text: "individuelle Controller-Umbauten und Modding auf Anfrage – Preis wird nach Absprache festgelegt.",
  },
  {
    icon: BatteryCharging,
    title: "Akku-Austausch",
    price: "ab 19 €",
    text: "Original-Akkus für DualSense & DualShock – schnell und günstig.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie & Sicherheit",
    price: "Inklusive",
    text: "Alle Reparaturen mit 2 Jahren Garantie. Kein Risiko für dich.",
  },
];

const games = [
  { name: "Orbital Drift", genre: "Racing", hue: "from-primary/40" },
  { name: "Shadow Protocol", genre: "Action", hue: "from-accent/30" },
  { name: "Neon Arena", genre: "Shooter", hue: "from-primary/30" },
  { name: "Deep Signal", genre: "Adventure", hue: "from-accent/20" },
];

function Index() {
  return (
    <div className="min-h-screen">
      <SiteHeader />

      <main>
        <section className="relative overflow-hidden">
          <img
            src={heroImage}
            alt="Abstrakte blaue Lichtstreifen vor dunklem Hintergrund"
            width={1920}
            height={1080}
            className="absolute inset-0 size-full object-cover opacity-70"
          />
          <div className="absolute inset-0 hero-surface opacity-80" />
          <div className="relative mx-auto max-w-6xl px-5 py-28 md:py-40">
            <span className="inline-flex items-center rounded-full border border-primary/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
              Next Gen
            </span>
            <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-[1.05] md:text-7xl">
              Spiele grenzenlos mit <span className="text-gradient-blue">Tech Doctor Play</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Deine Bibliothek, deine Trophäen, deine Crew. Stöbere frei — oder melde dich an und
              betritt den exklusiven Mitgliederbereich.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="hero" size="xl">
                <Link to="/auth">Zum Mitgliederbereich</Link>
              </Button>
              <Button asChild variant="outlineGlow" size="xl">
                <a href="#games">Spiele entdecken</a>
              </Button>
            </div>
          </div>
        </section>

        <section id="dienstleistungen" className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">Dienstleistungen</h2>
          <p className="mt-2 text-muted-foreground">
            Reparaturen rund um deinen Controller – transparent und fair.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map(({ icon: Icon, title, text, price }) => (
              <article key={title} className="glass-panel rounded-2xl p-6">
                <div className="flex items-start justify-between gap-4">
                  <span className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/15">
                    <Icon className="size-5 text-primary" />
                  </span>
                  <span className="text-sm font-semibold text-primary">{price}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="games" className="mx-auto max-w-6xl px-5 pb-24">
          <h2 className="text-3xl font-bold md:text-4xl">Im Store</h2>
          <p className="mt-2 text-muted-foreground">Eine Auswahl aus dem Tech Doctor Katalog.</p>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {games.map((game) => (
              <article
                key={game.name}
                className="group glass-panel overflow-hidden rounded-2xl transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className={`h-40 bg-gradient-to-br ${game.hue} to-transparent transition-opacity duration-300 group-hover:opacity-80`}
                />
                <div className="p-5">
                  <h3 className="font-semibold">{game.name}</h3>
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    {game.genre}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Reviews />
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Tech Doctor Play
      </footer>
    </div>
  );
}

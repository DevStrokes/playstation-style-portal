import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Zap, ShieldCheck, Gamepad2, Wrench, Cpu, BatteryCharging, ClipboardList, PackageCheck, MailCheck, Wrench as WrenchIcon } from "lucide-react";
import heroImage from "@/assets/hero.jpg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SiteHeader } from "@/components/SiteHeader";
import { Reviews } from "@/components/Reviews";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tech Doctor — Controller Reparatur & Modding" },
      {
        name: "description",
        content:
          "Tech Doctor bietet professionelle Controller-Reparaturen, Modding und Umbauten für DualSense & DualShock – schnell, zuverlässig und mit 2 Jahren Garantie.",
      },
      { property: "og:title", content: "Tech Doctor — Controller Reparatur & Modding" },
      {
        property: "og:description",
        content:
          "Professionelle Controller-Reparaturen und Modding für DualSense & DualShock. Mit 2 Jahren Garantie.",
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

const steps = [
  {
    icon: ClipboardList,
    title: "Anfrage stellen",
    text: "Beschreibe dein Problem über das Formular. Du erhältst eine Antwort mit Preis und Ablauf.",
  },
  {
    icon: PackageCheck,
    title: "Controller einschicken",
    text: "Nach Bestätigung schickst du deinen Controller sicher verpackt an Tech Doctor.",
  },
  {
    icon: WrenchIcon,
    title: "Reparatur",
    text: "Dein Controller wird professionell repariert – mit hochwertigen Teilen und 2 Jahren Garantie.",
  },
  {
    icon: MailCheck,
    title: "Zurück zu dir",
    text: "Sobald die Reparatur fertig ist, geht dein Controller auf dem Rückweg zu dir nach Hause.",
  },
];

function Index() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const subject = String(data.get("subject") ?? "");
    const message = String(data.get("message") ?? "");

    try {
      const { error } = await supabase.from("contact_requests").insert({
        name,
        email,
        subject,
        message,
      });
      if (error) throw error;
      setSubmitted(true);
      form.reset();
    } catch {
      alert("Beim Senden ist ein Fehler aufgetreten. Bitte versuche es später erneut.");
    } finally {
      setSending(false);
    }
  }

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
              Controller Reparatur
            </span>
            <h1 className="mt-6 max-w-3xl text-5xl font-extrabold leading-[1.05] md:text-7xl">
              Dein Controller in <span className="text-gradient-blue">Bestform</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Professionelle Reparaturen, Umbauten und Modding für DualSense & DualShock. Schnell,
              zuverlässig und mit 2 Jahren Garantie.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild variant="hero" size="xl">
                <a href="#dienstleistungen">Zu den Dienstleistungen</a>
              </Button>
              <Button asChild variant="outlineGlow" size="xl">
                <a href="#kontakt">Schreibe eine Anfrage</a>
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

        <section id="anleitung" className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">So funktioniert's</h2>
          <p className="mt-2 text-muted-foreground">
            In vier einfachen Schritten zu deinem reparierten Controller.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="relative glass-panel rounded-2xl p-6">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                    {i + 1}
                  </span>
                  <Icon className="size-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <Reviews />

        <section id="kontakt" className="mx-auto max-w-3xl px-5 py-20">
          <h2 className="text-3xl font-bold md:text-4xl">Schreibe eine Anfrage</h2>
          <p className="mt-2 text-muted-foreground">
            Beschreibe dein Problem – du erhältst eine Antwort mit Preis und Ablauf.
          </p>
          {submitted ? (
            <div className="mt-8 glass-panel rounded-2xl p-8 text-center">
              <MailCheck className="mx-auto size-10 text-primary" />
              <h3 className="mt-4 text-xl font-semibold">Anfrage gesendet</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Danke! Ich melde mich so schnell wie möglich bei dir.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 glass-panel space-y-5 rounded-2xl p-6">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" name="name" required placeholder="Dein Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="deine@email.de"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Controller / Problem</Label>
                <Input
                  id="subject"
                  name="subject"
                  required
                  placeholder="z. B. DualSense – Drift links"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Nachricht</Label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Beschreibe dein Problem so genau wie möglich."
                />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={sending}>
                {sending ? "Wird gesendet…" : "Anfrage senden"}
              </Button>
            </form>
          )}
        </section>
      </main>

      <footer className="border-t border-border/60 py-12 text-sm text-muted-foreground">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">
                Impressum
              </h3>
              <p className="leading-relaxed">
                Dilan Wojnicki
                <br />
                Kirchstraße 33
                <br />
                59269 Beckum
                <br />
                <a
                  href="mailto:doctortech101@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  doctortech101@gmail.com
                </a>
              </p>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">
                AGB
              </h3>
              <a
                href="/Tech_Doctor_AGB.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                AGB herunterladen (PDF)
              </a>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">
                Widerruf
              </h3>
              <a
                href="/Tech_Doctor_Widerruf.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Widerrufsbelehrung (PDF)
              </a>
            </div>

            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-widest text-foreground">
                Datenschutz
              </h3>
              <a
                href="/Tech_Doctor_Datenschutz.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                Datenschutzerklärung (PDF)
              </a>
            </div>
          </div>

          <div className="mt-8 border-t border-border/60 pt-6 text-center">
            © {new Date().getFullYear()} Tech Doctor
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useSession } from "@/hooks/useSession";
import { supabase } from "@/integrations/supabase/client";

type Review = {
  id: string;
  author_name: string;
  rating: number;
  body: string;
  created_at: string;
};

function Stars({ value, onChange }: { value: number; onChange?: (v: number) => void }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = n <= value;
        const cls = `size-5 ${filled ? "fill-primary text-primary" : "text-muted-foreground"}`;
        return onChange ? (
          <button
            key={n}
            type="button"
            aria-label={`${n} Sterne`}
            onClick={() => onChange(n)}
            className="transition-transform hover:scale-110"
          >
            <Star className={cls} />
          </button>
        ) : (
          <Star key={n} className={cls} />
        );
      })}
    </div>
  );
}

export function Reviews() {
  const { user, loading } = useSession();
  const queryClient = useQueryClient();
  const [rating, setRating] = useState(5);
  const [body, setBody] = useState("");

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("id, author_name, rating, body, created_at")
        .order("created_at", { ascending: false })
        .limit(24);
      if (error) throw error;
      return data as Review[];
    },
  });

  const createReview = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Nicht angemeldet");
      const authorName =
        (user.user_metadata?.full_name as string | undefined) ?? user.email?.split("@")[0] ?? "Mitglied";
      const { error } = await supabase
        .from("reviews")
        .insert({ user_id: user.id, author_name: authorName, rating, body: body.trim() });
      if (error) throw error;
    },
    onSuccess: () => {
      setBody("");
      setRating(5);
      toast.success("Danke für deine Rezension!");
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <section id="rezensionen" className="mx-auto max-w-6xl px-5 pb-24">
      <h2 className="text-3xl font-bold md:text-4xl">Kundenrezensionen</h2>
      <p className="mt-2 text-muted-foreground">
        Angemeldete Mitglieder dürfen eine Rezension schreiben.
      </p>

      <div className="glass-panel mt-8 rounded-2xl p-6">
        {loading ? (
          <p className="text-sm text-muted-foreground">Lade …</p>
        ) : user ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (body.trim().length < 3) {
                toast.error("Bitte schreibe ein paar Worte.");
                return;
              }
              createReview.mutate();
            }}
            className="space-y-4"
          >
            <Stars value={rating} onChange={setRating} />
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={4}
              maxLength={2000}
              placeholder="Wie war deine Reparatur bei Tech Doctor?"
              className="w-full rounded-xl border border-input bg-background/60 p-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <Button type="submit" variant="hero" disabled={createReview.isPending}>
              {createReview.isPending ? "Wird gesendet …" : "Rezension veröffentlichen"}
            </Button>
          </form>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Melde dich an, um eine Rezension zu schreiben.
            </p>
            <Button asChild variant="hero" size="sm">
              <Link to="/auth">Anmelden</Link>
            </Button>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.length === 0 ? (
          <p className="text-sm text-muted-foreground">Noch keine Rezensionen.</p>
        ) : (
          reviews.map((r) => (
            <article key={r.id} className="glass-panel rounded-2xl p-6">
              <Stars value={r.rating} />
              <p className="mt-4 text-sm text-muted-foreground">{r.body}</p>
              <p className="mt-4 text-xs uppercase tracking-widest">
                {r.author_name} · {new Date(r.created_at).toLocaleDateString("de-DE")}
              </p>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
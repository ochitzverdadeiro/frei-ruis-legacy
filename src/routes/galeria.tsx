import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { galeria } from "@/data/frei-rui";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galeria de Fotos — Frei Rui Guido Depiné" },
      {
        name: "description",
        content:
          "Imagens das fases da vida de Frei Rui Guido Depiné: origens em Rodeio, família, vida religiosa e celebrações.",
      },
      { property: "og:title", content: "Galeria de Fotos — Frei Rui Guido Depiné" },
      {
        property: "og:description",
        content: "Fases, eventos, família e amigos em imagens.",
      },
    ],
  }),
  component: Galeria,
});

const fases = ["Todas", "Origens", "Família", "Vida religiosa"] as const;

function Galeria() {
  const [fase, setFase] = useState<(typeof fases)[number]>("Todas");
  const [aberta, setAberta] = useState<number | null>(null);

  const fotos = fase === "Todas" ? galeria : galeria.filter((f) => f.fase === fase);
  const selecionada = aberta === null ? null : fotos[aberta];

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="eyebrow">Galeria</p>
      <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">Memórias em imagens</h1>
      <span className="rule-gold mt-6" />

      <div className="mt-10 flex flex-wrap gap-2">
        {fases.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => {
              setFase(f);
              setAberta(null);
            }}
            data-ativo={fase === f}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground data-[ativo=true]:border-accent data-[ativo=true]:bg-accent data-[ativo=true]:text-accent-foreground"
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fotos.map((foto, i) => (
          <figure key={foto.url + foto.legenda} className="group">
            <button
              type="button"
              onClick={() => setAberta(i)}
              className="block w-full overflow-hidden rounded-lg border border-border bg-card shadow-[var(--shadow-soft)]"
            >
              <img
                src={foto.url}
                alt={foto.alt}
                loading="lazy"
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </button>
            <figcaption className="mt-3 text-sm text-muted-foreground">{foto.legenda}</figcaption>
          </figure>
        ))}
      </div>

      <Dialog open={selecionada !== null} onOpenChange={(o) => !o && setAberta(null)}>
        <DialogContent className="max-w-3xl">
          {selecionada ? (
            <>
              <DialogTitle className="font-serif text-xl font-normal">
                {selecionada.legenda}
              </DialogTitle>
              <img
                src={selecionada.url}
                alt={selecionada.alt}
                className="max-h-[70vh] w-full rounded-md object-contain"
              />
            </>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}

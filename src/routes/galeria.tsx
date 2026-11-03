import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { galeria } from "@/data/frei-rui";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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

const fases = ["Todas", "Origens", "Família", "Vida religiosa", "Acervo"] as const;
const porPagina = 24;

function Galeria() {
  const [fase, setFase] = useState<(typeof fases)[number]>("Todas");
  const [aberta, setAberta] = useState<number | null>(null);
  const [pagina, setPagina] = useState(0);

  const fotos = fase === "Todas" ? galeria : galeria.filter((f) => f.fase === fase);
  const selecionada = aberta === null ? null : fotos[aberta];
  const totalPaginas = Math.ceil(fotos.length / porPagina);
  const fotosVisiveis = fotos.slice(pagina * porPagina, (pagina + 1) * porPagina);

  return (
    <div className="mx-auto max-w-6xl px-5 py-16">
      <p className="eyebrow">Galeria</p>
      <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">Memórias em imagens</h1>
      <span className="rule-gold mt-6" />

      <div className="mt-10 flex flex-wrap gap-2">
        {fases.map((f) => (
          <Button
            variant="outline"
            key={f}
            type="button"
            onClick={() => {
              setFase(f);
              setAberta(null);
              setPagina(0);
            }}
            data-ativo={fase === f}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground data-[ativo=true]:border-accent data-[ativo=true]:bg-accent data-[ativo=true]:text-accent-foreground"
          >
            {f}
          </Button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {fotosVisiveis.map((foto, i) => (
          <figure key={foto.url + foto.legenda} className="group">
            <Button
              variant="ghost"
              type="button"
              onClick={() => setAberta(pagina * porPagina + i)}
              aria-label={`Ampliar: ${foto.legenda}`}
              className="block h-auto w-full overflow-hidden rounded-lg border border-border bg-card p-0 shadow-[var(--shadow-soft)]"
            >
              <img
                src={foto.url}
                alt={foto.alt}
                loading="lazy"
                className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
            </Button>
            <figcaption className="mt-3 text-sm text-muted-foreground">{foto.legenda}</figcaption>
          </figure>
        ))}
      </div>

      {totalPaginas > 1 ? (
        <nav aria-label="Páginas da galeria" className="mt-10 flex items-center justify-center gap-5">
          <Button variant="outline" size="icon" aria-label="Página anterior" disabled={pagina === 0}
            onClick={() => { setPagina((p) => p - 1); setAberta(null); }}>
            <ChevronLeft />
          </Button>
          <span className="text-sm text-muted-foreground">{pagina + 1} / {totalPaginas}</span>
          <Button variant="outline" size="icon" aria-label="Próxima página" disabled={pagina + 1 === totalPaginas}
            onClick={() => { setPagina((p) => p + 1); setAberta(null); }}>
            <ChevronRight />
          </Button>
        </nav>
      ) : null}

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

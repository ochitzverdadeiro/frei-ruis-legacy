import { createFileRoute } from "@tanstack/react-router";
import { depoimentos } from "@/data/frei-rui";

export const Route = createFileRoute("/depoimentos/")({
  head: () => ({
    meta: [
      { title: "Depoimentos — Frei Rui Guido Depiné" },
      {
        name: "description",
        content:
          "Mensagens de familiares, confrades e amigos impactados pela vida de Frei Rui Guido Depiné.",
      },
      { property: "og:title", content: "Depoimentos — Frei Rui Guido Depiné" },
      {
        property: "og:description",
        content: "O que dizem quem conviveu com Frei Rui.",
      },
    ],
  }),
  component: Depoimentos,
});

function Depoimentos() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <p className="eyebrow">Depoimentos</p>
      <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">
        Vozes de quem conviveu
      </h1>
      <span className="rule-gold mt-6" />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Irmãos, primos, confrades, médicos, pacientes e amigos guardam pedaços da mesma
        história. Reunimos aqui essas lembranças.
      </p>

      <h2 className="mt-14 font-serif text-2xl text-foreground">Em poucas palavras</h2>
      <div className="mt-6 columns-1 gap-6 md:columns-2 [&>*]:mb-6 [&>*]:break-inside-avoid">
        {depoimentos.map((d) => (
          <blockquote
            key={d.autor + d.papel}
            className="surface-parchment rounded-lg border border-border p-7"
          >
            <p className="font-serif text-lg leading-relaxed italic text-foreground">“{d.texto}”</p>
            <footer className="mt-5 border-t border-border/70 pt-4">
              <p className="text-sm font-medium text-foreground">{d.autor}</p>
              <p className="text-xs text-muted-foreground">{d.papel}</p>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}

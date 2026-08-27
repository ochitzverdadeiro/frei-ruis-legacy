import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { escritos } from "@/data/escritos";

export const Route = createFileRoute("/escritos/")({
  head: () => ({
    meta: [
      { title: "Escritos e Homilias — Frei Rui Guido Depiné" },
      {
        name: "description",
        content:
          "Homilias, poemas, textos e memórias de Frei Rui Guido Depiné, OFM, publicados por seus amigos.",
      },
      { property: "og:title", content: "Escritos e Homilias — Frei Rui Guido Depiné" },
      {
        property: "og:description",
        content: "Palavras de fé, esperança e fraternidade deixadas por Frei Rui.",
      },
    ],
  }),
  component: Escritos,
});

const categorias = ["Todos", "Escritos do Frei Rui", "Homilias", "Memórias", "Ações"] as const;

function Escritos() {
  const [cat, setCat] = useState<(typeof categorias)[number]>("Todos");
  const lista = cat === "Todos" ? escritos : escritos.filter((e) => e.categoria === cat);

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <p className="eyebrow">Escritos</p>
      <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">
        Palavras que ficaram
      </h1>
      <span className="rule-gold mt-6" />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Frei Rui era um grande escritor. Homilias, poemas e reflexões seguiram para muitos lugares,
        levando consolo e fé até a quem nunca o conheceu pessoalmente. Reunimos aqui alguns desses
        textos, ao lado das memórias escritas por seus amigos.
      </p>

      <div className="mt-10 flex flex-wrap gap-2">
        {categorias.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCat(c)}
            data-ativo={cat === c}
            className="rounded-full border border-border px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground data-[ativo=true]:border-accent data-[ativo=true]:bg-accent data-[ativo=true]:text-accent-foreground"
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {lista.map((e) => (
          <Link
            key={e.slug}
            to="/escritos/$slug"
            params={{ slug: e.slug }}
            className="surface-parchment group rounded-lg border border-border p-6 transition-colors hover:border-accent"
          >
            <p className="eyebrow text-accent">{e.categoria}</p>
            <h2 className="mt-2 font-serif text-2xl text-foreground group-hover:text-accent">
              {e.titulo}
            </h2>
            {e.data ? <p className="mt-1 text-xs text-muted-foreground">{e.data}</p> : null}
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {e.paragrafos[1] ?? e.paragrafos[0]}
            </p>
            <span className="mt-4 inline-block text-sm text-accent">Ler o texto →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

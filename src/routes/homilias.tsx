import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { escritos } from "@/data/escritos";

// Conteúdo importado dos arquivos do Drive: oculto do público por enquanto.
export const Route = createFileRoute("/homilias")({
  beforeLoad: () => {
    throw notFound();
  },
  head: () => ({
    meta: [
      { title: "Homilias — Frei Rui Guido Depiné" },
      {
        name: "description",
        content:
          "Coletânea das homilias de Frei Rui Guido Depiné, OFM: pregações sobre o Evangelho, a fé e a fraternidade.",
      },
      { property: "og:title", content: "Homilias — Frei Rui Guido Depiné" },
      {
        property: "og:description",
        content: "Pregações e reflexões deixadas por Frei Rui ao longo de sua vida religiosa.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Homilias,
});

function Homilias() {
  const lista = escritos.filter((e) => e.categoria === "Homilias");

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <p className="eyebrow">Homilias</p>
      <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">
        A palavra pregada
      </h1>
      <span className="rule-gold mt-6" />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Ao longo de décadas, Frei Rui escreveu à mão as homilias que pregava. São {lista.length}{" "}
        textos reunidos aqui, guardados em cadernos e hoje partilhados com todos.
      </p>

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
            <span className="mt-4 inline-block text-sm text-accent">Ler a homilia →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

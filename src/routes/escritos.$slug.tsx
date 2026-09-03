import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { escritos } from "@/data/escritos";

export const Route = createFileRoute("/escritos/$slug")({
  // Conteúdo importado dos arquivos do Drive: oculto do público por enquanto.
  beforeLoad: () => {
    throw notFound();
  },
  loader: ({ params }) => {
    const escrito = escritos.find((e) => e.slug === params.slug);
    if (!escrito) throw notFound();
    return escrito;
  },
  head: ({ loaderData }) => {
    const titulo = loaderData ? `${loaderData.titulo} — Frei Rui Guido Depiné` : "Escrito";
    const desc = loaderData?.paragrafos[1]?.slice(0, 150) ?? "Texto de Frei Rui Guido Depiné.";
    return {
      meta: [
        { title: titulo },
        { name: "description", content: desc },
        { property: "og:title", content: titulo },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: Escrito,
});

function Escrito() {
  const escrito = Route.useLoaderData();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Link to="/escritos" className="text-sm text-muted-foreground hover:text-accent">
        ← Todos os escritos
      </Link>
      <p className="eyebrow mt-6 text-accent">{escrito.categoria}</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
        {escrito.titulo}
      </h1>
      {escrito.data ? (
        <p className="mt-2 text-sm text-muted-foreground">{escrito.data}</p>
      ) : null}
      <span className="rule-gold mt-6" />

      <section className="prose-memorial mt-10">
        {escrito.paragrafos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>
    </article>
  );
}

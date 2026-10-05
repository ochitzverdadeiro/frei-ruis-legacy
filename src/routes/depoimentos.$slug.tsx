import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { depoimentosLongos } from "@/data/depoimentos-longos";

export const Route = createFileRoute("/depoimentos/$slug")({
  loader: ({ params }) => {
    const dep = depoimentosLongos.find((d) => d.slug === params.slug);
    if (!dep) throw notFound();
    return dep;
  },
  head: ({ loaderData }) => {
    const titulo = loaderData
      ? `Depoimento de ${loaderData.autor} — Frei Rui Guido Depiné`
      : "Depoimento";
    const desc = loaderData?.resumo ?? "Depoimento sobre Frei Rui Guido Depiné.";
    return {
      meta: [
        { title: titulo },
        { name: "description", content: desc },
        { property: "og:title", content: titulo },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: DepoimentoPagina,
});

function DepoimentoPagina() {
  const dep = Route.useLoaderData();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Link to="/depoimentos" className="text-sm text-muted-foreground hover:text-accent">
        ← Todos os depoimentos
      </Link>
      <p className="eyebrow mt-6 text-accent">Depoimento</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
        {dep.autor}
      </h1>
      {dep.data ? <p className="mt-2 text-sm text-muted-foreground">{dep.data}</p> : null}
      <span className="rule-gold mt-6" />

      <section className="prose-memorial mt-10">
        {dep.paragrafos.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>
    </article>
  );
}

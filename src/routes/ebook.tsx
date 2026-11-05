import { createFileRoute, Link } from "@tanstack/react-router";
import { ebook, precoFormatado } from "@/data/ebook";
import freiRuiCapa from "@/assets/capa-livro-frei-rui.png.asset.json";

export const Route = createFileRoute("/ebook")({
  head: () => {
    const titulo = `${ebook.titulo} — o livro em versão digital`;
    const desc = `Biografia de Frei Rui Guido Depiné, OFM. ${ebook.paginas} páginas, ${ebook.capitulosTotal} capítulos. Ebook por ${precoFormatado(
      ebook.preco,
    )}, com download na página e cópia por e-mail.`;
    return {
      meta: [
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
        { title: `${titulo} — Legado Frei Rui Guido Depiné` },
        { name: "description", content: desc },
        { property: "og:title", content: titulo },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: Ebook,
});

function Ebook() {
  const preco = precoFormatado(ebook.preco);

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <p className="eyebrow">O livro</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
        {ebook.titulo}
      </h1>
      <p className="mt-2 font-serif text-xl text-muted-foreground italic">{ebook.subtitulo}</p>
      <span className="rule-gold mt-6" />

      <section className="mt-12 grid gap-10 sm:grid-cols-[minmax(0,300px)_1fr] sm:items-start">
        <div className="mx-auto w-full max-w-[300px]">
          <div className="overflow-hidden rounded-lg border-4 border-background bg-background shadow-frame">
            <img
              src={freiRuiCapa.url}
              alt={`Capa do ebook ${ebook.titulo}`}
              className="h-auto w-full"
              loading="eager"
            />
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            {ebook.formato} · {ebook.paginas} páginas
          </p>
        </div>

        <div>
          <p className="text-sm leading-relaxed text-muted-foreground">{ebook.resumo}</p>

          <p className="eyebrow mt-8">Quem escreveu</p>
          <ul className="mt-2 space-y-1 text-sm text-foreground">
            {ebook.autores.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>

          <dl className="mt-8 grid gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="eyebrow">Editora</dt>
              <dd className="mt-1 text-foreground">
                {ebook.editora}, {ebook.ano}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">ISBN</dt>
              <dd className="mt-1 text-foreground">{ebook.isbn}</dd>
            </div>
            <div>
              <dt className="eyebrow">Capítulos</dt>
              <dd className="mt-1 text-foreground">{ebook.capitulosTotal}</dd>
            </div>
            <div>
              <dt className="eyebrow">Páginas</dt>
              <dd className="mt-1 text-foreground">{ebook.paginas}</dd>
            </div>
          </dl>

          <div className="surface-parchment mt-10 rounded-lg border border-border p-6">
            <p className="eyebrow">Ebook</p>
            <p className="mt-2 font-serif text-4xl text-foreground">{preco}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              {ebook.formato}. Você recebe {ebook.entrega.join(" e ")}.
            </p>
            <Link
              to="/contato"
              className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Comprar o ebook
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
              A compra direta nesta página será aberta em breve. Enquanto isso, fale com a família
              pelo Contato e reserve o seu exemplar.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-20">
        <p className="eyebrow">O que está dentro</p>
        <h2 className="mt-3 font-serif text-3xl text-foreground">Do vale de Rodeio a São Roque</h2>
        <span className="rule-gold mt-6" />
        <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          A obra percorre a vida inteira de Frei Rui: a descendência italiana e alemã, o seminário,
          a ordenação, as missões, as hostilidades que enfrentou e a reconstrução do Hospital São
          Roque. Reúne ainda depoimentos da família, as poesias que escrevia e as mensagens de Natal
          deixadas aos amigos.
        </p>

        <ol className="mt-10 grid gap-x-10 gap-y-3 sm:grid-cols-2">
          {ebook.capitulos.map((c) => (
            <li key={c.numero} className="flex items-baseline gap-3 text-sm">
              <span className="eyebrow shrink-0 text-accent">{c.numero}</span>
              <span className="text-foreground">{c.titulo}</span>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20 grid gap-5 sm:grid-cols-2">
        <div className="surface-parchment rounded-lg border border-border p-6">
          <p className="eyebrow">Na hora</p>
          <h3 className="mt-2 font-serif text-xl text-foreground">Download na página</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Assim que o pagamento é confirmado, o arquivo é liberado aqui no site para você baixar
            quando quiser.
          </p>
        </div>
        <div className="surface-parchment rounded-lg border border-border p-6">
          <p className="eyebrow">Cópia segura</p>
          <h3 className="mt-2 font-serif text-xl text-foreground">Por e-mail</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            A mesma versão segue por e-mail, para você guardar e enviar a quem quiser.
          </p>
        </div>
      </section>

      <section className="mt-20 border-y border-border/70 bg-secondary/50 px-5 py-14 text-center">
        <p className="mx-auto max-w-2xl font-serif text-2xl leading-relaxed text-foreground italic">
          “{ebook.citacao.texto}”
        </p>
        <p className="mt-4 text-xs text-muted-foreground">{ebook.citacao.referencia}</p>
      </section>

      <p className="mt-14 text-center text-sm text-muted-foreground">
        Dúvidas sobre a compra ou sobre o livro?{" "}
        <Link to="/contato" className="text-accent hover:underline">
          Fale com a família
        </Link>
        .
      </p>
    </div>
  );
}

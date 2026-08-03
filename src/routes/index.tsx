import { createFileRoute, Link } from "@tanstack/react-router";
import { perfil, depoimentos, linhaDoTempo } from "@/data/frei-rui";
import freiRuiCapa from "@/assets/frei-rui-capa.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Frei Rui Guido Depiné — Vida e Legado" },
      {
        name: "description",
        content:
          "Legado de Frei Rui Guido Depiné, OFM (1942–2020): franciscano de Rodeio (SC) que dedicou a vida aos pobres e ao Hospital São Roque, em Piraquara (PR).",
      },
      { property: "og:title", content: "Frei Rui Guido Depiné — Vida e Legado" },
      {
        property: "og:description",
        content:
          "A vida, a história e o legado do frade franciscano que transformou dor em acolhimento.",
      },
    ],
  }),
  component: Inicio,
});

function Inicio() {
  const destaques = linhaDoTempo.slice(0, 3);

  return (
    <>
      <section className="relative isolate border-b border-border/70 bg-secondary">
        <div className="mx-auto grid min-h-[62vh] max-w-6xl items-center gap-10 px-5 py-16 sm:grid-cols-2 sm:py-24">
          <div className="flex flex-col items-start text-left">
            <span className="eyebrow">1942 — 2020</span>
            <h1 className="mt-5 font-serif text-4xl leading-tight text-foreground sm:text-5xl lg:text-6xl">
              Frei Rui Guido Depiné
            </h1>
            <span className="rule-gold mt-6" />
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Frade da Ordem Franciscana Menor. Homem simples, alegre e resiliente, que fez da
              própria vida um caminho de serviço aos mais pobres.
            </p>
          </div>

          <div className="flex items-center justify-center sm:justify-end">
            <div className="relative aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-lg border-4 border-background bg-background shadow-frame sm:max-w-[320px]">
              <img
                src={freiRuiCapa.url}
                alt="Frei Rui Guido Depiné"
                className="h-full w-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-5xl px-5 py-20">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="eyebrow">Nascimento</p>
            <p className="mt-2 font-serif text-lg text-foreground">{perfil.nascimento}</p>
          </div>
          <div>
            <p className="eyebrow">Ordenação sacerdotal</p>
            <p className="mt-2 font-serif text-lg text-foreground">
              18 de julho de 1971 — Rodeio, Santa Catarina
            </p>
          </div>
          <div>
            <p className="eyebrow">Páscoa definitiva</p>
            <p className="mt-2 font-serif text-lg text-foreground">{perfil.falecimento}</p>
          </div>
        </div>

        <div className="mt-16 surface-parchment rounded-lg p-8 sm:p-12">
          <h2 className="font-serif text-3xl text-foreground">Uma homenagem</h2>
          <span className="rule-gold mt-4" />
          <div className="prose-memorial mt-6 max-w-3xl">
            <p>{perfil.resumo}</p>
            <p>
              Movido por uma fé inabalável e por profundo senso de missão, transformou o que era
              isolamento e dor em acolhimento, solidariedade e esperança. Sua presença constante
              entre os doentes, o apoio moral e material que oferecia e sua luta pela inclusão
              social dos pacientes fizeram dele uma figura inesquecível.
            </p>
            <p>
              A quem o conheceu, deixou o testemunho franciscano de simplicidade, pobreza e amor
              ao próximo. A quem não o conheceu, deixa esta memória.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-border/70 bg-secondary/50">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="eyebrow">Momentos</p>
          <h2 className="mt-2 font-serif text-3xl text-foreground">O começo de tudo</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {destaques.map((m) => (
              <article key={m.ano} className="rounded-lg border border-border bg-card p-6">
                <p className="eyebrow">{m.ano}</p>
                <h3 className="mt-2 font-serif text-xl text-foreground">{m.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.texto}</p>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <Link
              to="/linha-do-tempo"
              className="text-sm text-accent underline-offset-4 hover:underline"
            >
              Ver a linha do tempo completa →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 text-center">
        <p className="eyebrow">Quem conviveu com ele</p>
        <blockquote className="mt-6 font-serif text-2xl leading-relaxed text-foreground sm:text-3xl">
          “{depoimentos[0].texto}”
        </blockquote>
        <p className="mt-6 text-sm text-muted-foreground">
          {depoimentos[0].autor} · {depoimentos[0].papel}
        </p>
        <div className="mt-8">
          <Link
            to="/depoimentos"
            className="text-sm text-accent underline-offset-4 hover:underline"
          >
            Ler todos os depoimentos →
          </Link>
        </div>
      </section>
    </>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { perfil } from "@/data/frei-rui";
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
  return (
    <>
      <section className="relative isolate border-b border-border/70 bg-secondary">
        <div className="mx-auto flex min-h-[62vh] max-w-6xl flex-col items-center justify-center px-5 py-16 text-center sm:py-24">
          <div className="relative mx-auto aspect-[3/4] w-full max-w-[280px] overflow-hidden rounded-lg border-4 border-background bg-background shadow-frame sm:max-w-[220px]">
            <img
              src={freiRuiCapa.url}
              alt="Frei Rui Guido Depiné"
              className="h-full w-full object-cover"
              loading="eager"
            />
          </div>
          <span className="eyebrow mt-8">1942 — 2020</span>
          <h1 className="mt-5 font-serif text-4xl leading-tight text-foreground sm:text-6xl">
            Frei Rui Guido Depiné
          </h1>
          <span className="rule-gold mt-6" />
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Frade da Ordem Franciscana Menor. Homem simples, alegre e resiliente, que fez da
            própria vida um caminho de serviço aos mais pobres.
          </p>
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
      </section>

      <section className="border-y border-border/70 bg-secondary/50">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center">
          <p className="eyebrow">Legado vivo</p>
          <h2 className="mt-3 font-serif text-3xl text-foreground">Manter o nome vivo</h2>
          <span className="rule-gold mt-6" />
          <p className="mt-6 text-sm leading-relaxed text-muted-foreground sm:text-base">
            Familiares, confrades e amigos se unem para preservar a memória de Frei Rui. Através de
            relatos, fotos, orações e este espaço, eles querem que sua história de amor aos pobres e
            de serviço franciscano continue inspirando Rodeio, Piraquara e todos que forem tocados
            por esse legado.
          </p>
        </div>
      </section>
    </>
  );
}

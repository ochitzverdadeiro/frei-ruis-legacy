import { createFileRoute } from "@tanstack/react-router";
import { linhaDoTempo } from "@/data/frei-rui";

export const Route = createFileRoute("/linha-do-tempo")({
  head: () => ({
    meta: [
      { title: "Linha do Tempo — Frei Rui Guido Depiné" },
      {
        name: "description",
        content:
          "Cronologia da vida de Frei Rui Guido Depiné: de 1875, com a chegada dos Depiné a Rodeio (SC), até 2020.",
      },
      { property: "og:title", content: "Linha do Tempo — Frei Rui Guido Depiné" },
      {
        property: "og:description",
        content: "Os momentos marcantes da trajetória de Frei Rui, ano a ano.",
      },
    ],
  }),
  component: LinhaDoTempo,
});

function LinhaDoTempo() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="eyebrow">Cronologia</p>
      <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">Linha do Tempo</h1>
      <span className="rule-gold mt-6" />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Das raízes trentinas em Rodeio à Páscoa definitiva: os momentos que desenham a vida de
        Frei Rui.
      </p>

      <ol className="relative mt-14 border-l border-border pl-8 sm:pl-10">
        {linhaDoTempo.map((m) => (
          <li key={m.ano + m.titulo} className="relative pb-14 last:pb-0">
            <span className="absolute -left-[2.15rem] top-1.5 size-2.5 rounded-full bg-gold ring-4 ring-background sm:-left-[2.65rem]" />
            <p className="eyebrow text-accent">{m.ano}</p>
            <h2 className="mt-2 font-serif text-2xl text-foreground">{m.titulo}</h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {m.texto}
            </p>
            {m.imagem ? (
              <img
                src={m.imagem.url}
                alt={m.imagem.alt}
                loading="lazy"
                className="mt-5 max-h-72 w-full max-w-md rounded-lg border border-border object-cover shadow-[var(--shadow-soft)]"
              />
            ) : null}
          </li>
        ))}
      </ol>
    </div>
  );
}

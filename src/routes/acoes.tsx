import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/acoes")({
  head: () => ({
    meta: [
      { title: "Ações de Ajuda ao Próximo — Legado Frei Rui" },
      {
        name: "description",
        content:
          "Cestas básicas, doações e festas para as crianças de Piraquara (PR): as ações que continuam o trabalho de Frei Rui Guido Depiné.",
      },
      { property: "og:title", content: "Ações de Ajuda ao Próximo — Legado Frei Rui" },
      {
        property: "og:description",
        content: "O trabalho solidário que segue vivo com as Irmãs Franciscanas de São José.",
      },
    ],
  }),
  component: Acoes,
});

const festas = [
  {
    titulo: "Festa da Páscoa",
    texto:
      "Voluntários levam doces e carinho às crianças dos bairros mais carentes de Piraquara na Páscoa.",
  },
  {
    titulo: "Dia das Crianças",
    texto:
      "Em 12 de outubro, caravanas de voluntários distribuem brinquedos e doces, como Frei Rui fazia.",
  },
  {
    titulo: "Festa de Natal",
    texto:
      "No Natal, presentes e alegria chegam às famílias cadastradas, mantendo viva a tradição do Frei.",
  },
];

function Acoes() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="eyebrow">Ações</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
        Ações de ajuda ao próximo
      </h1>
      <span className="rule-gold mt-6" />

      <section className="prose-memorial mt-12">
        <p>
          O Legado do Frei Rui, junto com benfeitores e voluntários, ajuda as Irmãs Franciscanas de
          São José da Fraternidade do São Roque, em Piraquara (PR), em diversas ações de ajuda ao
          próximo.
        </p>
        <p>
          São distribuídas cestas básicas para famílias carentes devidamente cadastradas, além de
          roupas, cobertores, móveis e diversos itens doados por benfeitores e voluntários. Tudo é
          entregue aos mais necessitados, visando minorar o sofrimento do próximo, em sintonia com o
          carisma franciscano e o carisma da Misericórdia.
        </p>
      </section>

      <h2 className="mt-14 font-serif text-2xl text-foreground">Três festas por ano</h2>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Todos os anos são realizadas três festas para as crianças. Em caravana, voluntários adentram
        os bairros mais carentes de Piraquara para levar um pouco de carinho em forma de doces e
        brinquedos, dando continuidade ao trabalho que o Frei Rui desenvolvia. Todas as doações são
        feitas por benfeitores abnegados que só querem ver a alegria das crianças e de suas famílias
        em momentos tão especiais.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {festas.map((f) => (
          <div key={f.titulo} className="surface-parchment rounded-lg border border-border p-6">
            <h3 className="font-serif text-xl text-foreground">{f.titulo}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.texto}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

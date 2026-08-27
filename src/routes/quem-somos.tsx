import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/quem-somos")({
  head: () => ({
    meta: [
      { title: "Quem Somos — Legado Frei Rui Guido Depiné" },
      {
        name: "description",
        content:
          "O grupo de amigos, benfeitores e voluntários que preserva e divulga o legado de Frei Rui Guido Depiné, OFM.",
      },
      { property: "og:title", content: "Quem Somos — Legado Frei Rui Guido Depiné" },
      {
        property: "og:description",
        content: "Amigos, Irmãs Franciscanas de São José e Fraternidade do São Roque.",
      },
    ],
  }),
  component: QuemSomos,
});

function QuemSomos() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="eyebrow">Quem somos</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
        O grupo Legado do Frei Rui Depiné
      </h1>
      <span className="rule-gold mt-6" />

      <section className="prose-memorial mt-12">
        <p>
          Frei Rui Guido Depiné, OFM, partiu para a Casa do Pai em 12 de junho de 2020, e sua
          partida partiu o coração de toda a comunidade e dos muitos amigos que ele fez em todos os
          lugares por onde passou. Do nosso luto surgiu a ideia de criar este espaço, em homenagem
          ao trabalho deste frade franciscano que doou a vida pelos outros.
        </p>
        <p>
          Somos amigos do Frei Rui e, em conjunto e de acordo com o carisma franciscano, nos unimos
          para honrar e preservar a sua memória e a sua história. Decidimos seguir divulgando a sua
          obra, para que todos possam ler, refletir e crescer com seus ensinamentos e atos; pois o
          Frei Rui nos ensinou muito, principalmente a olhar o outro como irmão. Todos os outros: o
          mais fraco e o mais forte, o mais pobre e o mais rico, o mais anônimo e o mais famoso.
          Para o Frei Rui não existiam distinções.
        </p>
        <p>
          Ele construiu um legado incomensurável pela sua grandeza e importância. Ajudou milhares de
          pessoas em situação de risco, criou e apoiou várias instituições beneficentes e foi
          porta-voz de muitos desvalidos, injustiçados, sofridos, doentes e discriminados.
        </p>
        <p>
          Era um amigo fiel, leal, conselheiro sábio e inteligente. Falava o que precisávamos ouvir
          sem nunca magoar ninguém. Sensível, escrevia poesias, textos e homilias admiráveis. Aqui
          publicamos seus escritos, depoimentos de pessoas que o conheceram e os eventos realizados
          a partir de seu trabalho.
        </p>

        <h2 className="font-serif text-2xl text-foreground">Autorização e responsabilidade</h2>
        <p>
          Para bem realizarmos este trabalho, pedimos a permissão da Província Franciscana da
          Imaculada Conceição do Brasil que, em consenso com a família Depiné e em comum acordo,
          acharam por bem dar autorização oficial e exclusiva para que o grupo do “Legado do Frei
          Rui Depiné” seja herdeiro oficial e responsável pelo cuidado e gestão do extenso legado
          deixado pelo saudoso Frei Rui Guido Depiné, OFM.
        </p>
        <p>
          Este grupo contempla ampla gama de amigos, benfeitores e voluntários, além da Congregação
          das Irmãs Franciscanas de São José e da Fraternidade do São Roque.
        </p>
        <p>
          Assumimos esta tarefa com devoção, profundo respeito, amor e responsabilidade. Agradecemos
          a confiança e vamos honrar este compromisso nos dedicando com especial atenção e carinho a
          esta missão, que consideramos sagrada.
        </p>
        <p className="font-serif text-xl text-foreground">Paz e Bem!</p>
      </section>
    </article>
  );
}

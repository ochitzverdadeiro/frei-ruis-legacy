import { createFileRoute } from "@tanstack/react-router";
import rodeioVista from "@/assets/rodeio-vista.jpg.asset.json";
import eremiterio from "@/assets/eremiterio.jpg.asset.json";

export const Route = createFileRoute("/historia")({
  head: () => ({
    meta: [
      { title: "História e Legado — Frei Rui Guido Depiné" },
      {
        name: "description",
        content:
          "Biografia de Frei Rui Guido Depiné: das raízes italianas em Rodeio (SC) ao serviço aos doentes do Hospital São Roque, em Piraquara (PR).",
      },
      { property: "og:title", content: "História e Legado — Frei Rui Guido Depiné" },
      {
        property: "og:description",
        content: "Origens, vocação, missão e legado de um frade franciscano.",
      },
    ],
  }),
  component: Historia,
});

function Historia() {
  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <p className="eyebrow">História</p>
      <h1 className="mt-3 font-serif text-4xl leading-tight text-foreground sm:text-5xl">
        Um caminho de simplicidade e serviço
      </h1>
      <span className="rule-gold mt-6" />

      <section className="prose-memorial mt-12">
        <h2 className="font-serif text-2xl text-foreground">As origens</h2>
        <p>
          A história começa muito antes do seu nascimento. Em 1875, Carlo Natale Depiné e Teresa
          Fadanelli deixaram a região de Trento, no norte da Itália, e cruzaram o oceano em busca
          de terra e futuro. Encontraram os dois em Rodeio, no Vale do Itajaí, em Santa Catarina —
          um lugar de morros verdes, roças pequenas e capelas simples.
        </p>
        <p>
          Ali, em 23 de dezembro de 1939, José Depiné — agricultor, alfaiate e Juiz de Paz — casou-se
          com Lydia Ida Maria Benkendorf, de ascendência alemã. Formaram uma família muito
          religiosa: os pais pertenciam à Ordem Franciscana Secular e ao Apostolado da Oração, e
          eram presença certa nas celebrações. Rui Guido, nascido em 8 de outubro de 1942, foi o
          segundo de onze irmãos — quatro homens e sete mulheres — e cresceu entre o milho, o
          arroz, a horta e as vacas, aprendendo cedo que o trabalho e a oração caminham juntos.
        </p>


        <figure className="not-prose my-10">
          <img
            src={rodeioVista.url}
            alt="Vista de Rodeio (SC), com a Igreja Matriz ao centro do vale"
            loading="lazy"
            className="w-full rounded-lg border border-border object-cover shadow-[var(--shadow-frame)]"
          />
          <figcaption className="mt-3 text-xs text-muted-foreground">
            Rodeio (SC), no Vale do Itajaí — onde tudo começou.
          </figcaption>
        </figure>

        <h2 className="font-serif text-2xl text-foreground">A vocação</h2>
        <p>
          Menino, ia à escola de pés descalços com a irmã Lourdes, guardando os sapatos para
          chegar limpo. Servia como coroinha na capela das Irmãs Catequistas Franciscanas e já
          então repartia o próprio lanche com quem tinha menos. Quem o via ajudar na Missa dizia:
          este menino vai ser padre.
        </p>
        <p>
          Em 1954, com apenas doze anos, ingressou no seminário da Província Franciscana da
          Imaculada Conceição do Brasil. O caminho de formação o levou por Rodeio, Rio Negro e
          Agudos; fez o noviciado em Rodeio, a Filosofia em Curitiba e a Teologia em Petrópolis.
          Em 18 de julho de 1971, foi ordenado sacerdote na terra natal, diante da família e dos
          vizinhos que o viram crescer.
        </p>
        <blockquote className="not-prose my-8 border-l-2 border-gold pl-6 font-serif text-xl italic leading-relaxed text-foreground">
          “Somos a esperança de alguma coisa que em nós poderá acontecer.”
          <span className="mt-2 block font-sans text-xs not-italic text-muted-foreground">
            Frase da lembrança de sua ordenação sacerdotal, 1971
          </span>
        </blockquote>

        <h2 className="font-serif text-2xl text-foreground">A missão entre os pobres</h2>
        <p>
          Nas primeiras missões, em Duque de Caxias e Concórdia, ficou conhecido por uma coisa
          simples e desconcertante: não guardava nada. Vinhos, roupas, sapatos, presentes — tudo o
          que recebia acabava nas mãos de quem precisava mais. Não reteve nada para si.
        </p>
        <p>
          Foi em Piraquara, no Paraná, junto ao antigo complexo da Colônia São Roque, que sua vida
          encontrou a forma definitiva. O lugar havia nascido como espaço de isolamento das
          pessoas atingidas pela hanseníase — um endereço de exclusão e sofrimento. Frei Rui o
          transformou em casa.
        </p>
        <p>
          Reformou o hospital, ergueu pequenas casas para famílias sem teto, distribuiu cestas
          básicas, remédios, roupas e material de construção, arranjou trabalho para muitos e
          brigou pela inclusão social dos pacientes. Recebia governadores e presidiários com a
          mesma atenção: para ele, todos eram gente. Recebeu o título de Cidadão Paranaense, mas
          fugia dos palcos e das honrarias.
        </p>


        <h2 className="font-serif text-2xl text-foreground">O pomar, os pássaros e a música</h2>
        <p>
          Ao lado da capela São Roque, entre araucárias centenárias, cultivou um pomar. Colhia e
          repartia os frutos com confrades, irmãs, moradores e visitantes. Amava os pássaros e a
          natureza com aquela alegria franciscana que não precisa de explicação.
        </p>
        <p>
          Amava também a música. Formou corais, ensaiou cantos, encenou a Paixão de Cristo e
          repetia a quem quisesse ouvir que sem música não se celebra bem uma Missa. Nas férias em
          Rodeio, reunia os primos na casa dos avós para ensinar inglês atrás de uma porta de
          madeira, e depois jogava futebol com eles até a bola sumir no escuro.
        </p>

        <h2 className="font-serif text-2xl text-foreground">O silêncio e a Páscoa</h2>
        <p>
          Nos últimos anos, o Parkinson foi tirando dele a fala e o movimento. Em 2018 foi
          transferido para uma casa de repouso franciscana. Amigos percorriam mais de quinhentos
          quilômetros para vê-lo, e às vezes, num lampejo, ele reconhecia e sorria — bastava isso
          para valer a viagem.
        </p>
        <p>
          Na madrugada de 12 de junho de 2020, véspera do dia de Santo Antônio, Frei Rui voltou
          para o Pai, em Bragança Paulista (SP).
        </p>

        <figure className="not-prose my-10">
          <img
            src={eremiterio.url}
            alt="Eremitério Frei Egídio, em Rodeio (SC)"
            loading="lazy"
            className="w-full rounded-lg border border-border object-cover shadow-[var(--shadow-frame)]"
          />
          <figcaption className="mt-3 text-xs text-muted-foreground">
            Eremitério Frei Egídio, em Rodeio (SC): lugar de silêncio, oração e retorno às raízes.
          </figcaption>
        </figure>

        <h2 className="font-serif text-2xl text-foreground">O legado</h2>
        <p>
          O legado de Frei Rui não está em monumentos. Está nas famílias que ganharam casa, nos
          doentes que voltaram a ser tratados como pessoas, nos jovens que aprenderam a cantar,
          nos amigos que aprenderam a repartir. Está numa maneira de viver: sem apego, sem
          vaidade, sem medo de perder.
        </p>
        <p>
          Sempre perseguido, mas alegre. Nunca se rendeu ao erro nem à injustiça. Seu nome era
          resiliência — e sua vida, uma esperança que segue caminhando.
        </p>
      </section>
    </article>
  );
}

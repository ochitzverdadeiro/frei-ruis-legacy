import igrejaRodeio from "@/assets/igreja-rodeio.jpg.asset.json";
import pracaImigrantes from "@/assets/praca-imigrantes.jpg.asset.json";
import totemImigrantes from "@/assets/totem-imigrantes.jpg.asset.json";
import rodeioVista from "@/assets/rodeio-vista.jpg.asset.json";
import lembrancaOrdenacao from "@/assets/lembranca-ordenacao.jpg.asset.json";
import celebracao from "@/assets/celebracao.jpg.asset.json";
import eremiterio from "@/assets/eremiterio.jpg.asset.json";
import familiaAntiga from "@/assets/familia-antiga.jpg.asset.json";

export const perfil = {
  nome: "Frei Rui Guido Depiné, OFM",
  nascimento: "8 de outubro de 1942 — Rodeio, Santa Catarina",
  falecimento: "12 de junho de 2020 — Bragança Paulista, São Paulo",
  lema: "A vida é uma esperança que caminha.",
  resumo:
    "Frade da Ordem Franciscana Menor, da Província da Imaculada Conceição do Brasil. Dedicou a vida aos mais pobres e, em Piraquara (PR), transformou o Hospital São Roque — antigo espaço de isolamento das pessoas atingidas pela hanseníase — em casa de acolhimento, dignidade e esperança.",
};

export type MomentoLinhaTempo = {
  ano: string;
  titulo: string;
  texto: string;
  imagem?: { url: string; alt: string };
};

export const linhaDoTempo: MomentoLinhaTempo[] = [
  {
    ano: "1875",
    titulo: "As raízes em Rodeio",
    texto:
      "Carlo Natale Depiné e Teresa Fadanelli deixam a região de Trento, na Itália, e chegam a Rodeio, em Santa Catarina, entre as primeiras famílias imigrantes do vale. Dessa gente da terra nasceria, décadas depois, o menino Rui.",
    imagem: { url: totemImigrantes.url, alt: "Totem em homenagem aos imigrantes de Rodeio, onde consta o nome de Carlo Depiné" },
  },
  {
    ano: "1939",
    titulo: "José e Lydia",
    texto:
      "Em 23 de dezembro, José Depiné, agricultor, alfaiate e Juiz de Paz, casa-se com Lydia Ida Maria Benkendorf. Formariam uma família de doze filhos, criada na fé católica e no trabalho da roça.",
    imagem: { url: familiaAntiga.url, alt: "Retrato antigo da família Depiné" },
  },
  {
    ano: "1942",
    titulo: "Nascimento",
    texto:
      "Em 8 de outubro nasce Rui Guido Depiné, em Rodeio (SC). Descendente de italianos pelo pai e de alemães pela mãe, cresce entre o arroz, o milho, a horta e as vacas da propriedade da família.",
    imagem: { url: rodeioVista.url, alt: "Vista antiga de Rodeio, Santa Catarina" },
  },
  {
    ano: "Anos 1950",
    titulo: "O menino coroinha",
    texto:
      "Estuda na Escola Oswaldo Cruz, percorrendo o caminho de pés descalços com a irmã Lourdes. Serve como coroinha na capela das Irmãs Catequistas Franciscanas e divide o próprio lanche com o colega que só tinha pão seco.",
    imagem: { url: igrejaRodeio.url, alt: "Igreja Matriz de São Francisco de Assis, em Rodeio (SC)" },
  },
  {
    ano: "1954",
    titulo: "O chamado",
    texto:
      "Ingressa no Seminário da Província Franciscana da Imaculada Conceição do Brasil. A formação o leva de Rodeio a Rio Negro e Agudos, com o noviciado em Rodeio, a Filosofia em Curitiba e a Teologia em Petrópolis.",
  },
  {
    ano: "1971",
    titulo: "Ordenação sacerdotal",
    texto:
      "Em 18 de julho é ordenado sacerdote em Rodeio (SC). Na lembrança da ordenação, a frase que o acompanharia por toda a vida: “Somos a esperança de alguma coisa que em nós poderá acontecer.”",
    imagem: { url: lembrancaOrdenacao.url, alt: "Lembrança da ordenação sacerdotal de Rui Depiné, Rodeio, 18 de julho de 1971" },
  },
  {
    ano: "Anos 1970–80",
    titulo: "Missão em Duque de Caxias e Concórdia",
    texto:
      "Nas primeiras missões, distribui aos pobres tudo o que recebe — vinhos, roupas, sapatos. Nada retinha para si. Amizades feitas ali acompanhariam a família Depiné por décadas.",
    imagem: { url: celebracao.url, alt: "Celebração presidida por Frei Rui" },
  },
  {
    ano: "Piraquara (PR)",
    titulo: "Hospital São Roque",
    texto:
      "No antigo complexo da Colônia São Roque, torna-se lutador dos doentes e dos pobres: reforma o hospital, constrói pequenas casas para famílias carentes, distribui cestas básicas, remédios, roupas e material de construção, e arranja trabalho para muitos. Trata governadores e presidiários com a mesma dignidade.",
  },
  {
    ano: "Ao longo da vida",
    titulo: "O pomar, os pássaros e a música",
    texto:
      "Ao lado da capela São Roque cultiva um pomar entre araucárias centenárias e reparte os frutos com confrades, irmãs, moradores e visitantes. Forma corais, encena a Paixão de Cristo e repete que sem música não se celebra bem uma Missa.",
  },
  {
    ano: "Terra Santa",
    titulo: "Peregrinação a Israel e à Itália",
    texto:
      "Percorre os lugares de Jesus e de São Francisco. Volta com reflexões, pedras, lembranças e histórias que contaria pelo resto da vida a quem quisesse ouvir.",
    imagem: { url: eremiterio.url, alt: "Visita ao Eremitério Frei Egídio, em Rodeio (SC)" },
  },
  {
    ano: "2007",
    titulo: "Encontro da Família Depiné",
    texto:
      "Em 27 de outubro celebra a Missa do grande encontro dos descendentes da família Depiné — um sábado que ele mesmo descreveu como “muito especial”.",
    imagem: { url: pracaImigrantes.url, alt: "Praça dos Imigrantes, em Rodeio (SC)" },
  },
  {
    ano: "2018",
    titulo: "O tempo do silêncio",
    texto:
      "Com a saúde debilitada pelo Parkinson, é transferido para uma casa de repouso franciscana. Recebe visitas de amigos que percorrem mais de 500 km e, num lampejo de memória, ainda reconhece e sorri.",
  },
  {
    ano: "2020",
    titulo: "A Páscoa do Frei Rui",
    texto:
      "Na madrugada de 12 de junho, véspera do dia de Santo Antônio, Frei Rui volta para o Pai, em Bragança Paulista (SP). Deixa um vazio — e um legado que segue caminhando.",
  },
];

export type FotoGaleria = {
  url: string;
  alt: string;
  legenda: string;
  fase: string;
};

export const galeria: FotoGaleria[] = [
  {
    url: rodeioVista.url,
    alt: "Vista de Rodeio, Santa Catarina, com casas e igreja",
    legenda: "Rodeio (SC), o vale onde tudo começou",
    fase: "Origens",
  },
  {
    url: totemImigrantes.url,
    alt: "Totem em homenagem aos imigrantes de Rodeio",
    legenda: "Totem dos imigrantes, com o nome de Carlo Depiné",
    fase: "Origens",
  },
  {
    url: pracaImigrantes.url,
    alt: "Praça dos Imigrantes, em Rodeio, Santa Catarina",
    legenda: "Praça dos Imigrantes, Rodeio (SC)",
    fase: "Origens",
  },
  {
    url: familiaAntiga.url,
    alt: "Retrato antigo da família Depiné reunida",
    legenda: "A família Depiné reunida",
    fase: "Família",
  },
  {
    url: igrejaRodeio.url,
    alt: "Igreja Matriz de São Francisco de Assis, em Rodeio",
    legenda: "Igreja Matriz de São Francisco de Assis, Rodeio (SC)",
    fase: "Família",
  },
  {
    url: lembrancaOrdenacao.url,
    alt: "Lembrança impressa da ordenação sacerdotal de Rui Depiné em 1971",
    legenda: "Lembrança da ordenação sacerdotal — Rodeio, 18 de julho de 1971",
    fase: "Vida religiosa",
  },
  {
    url: celebracao.url,
    alt: "Celebração religiosa presidida por Frei Rui",
    legenda: "Uma celebração entre o povo",
    fase: "Vida religiosa",
  },
  {
    url: eremiterio.url,
    alt: "Visita ao Eremitério Frei Egídio, em Rodeio",
    legenda: "Eremitério Frei Egídio, lugar de silêncio e oração",
    fase: "Vida religiosa",
  },
];

export type Depoimento = {
  texto: string;
  autor: string;
  papel: string;
};

export const depoimentos: Depoimento[] = [
  {
    texto:
      "Frei Rui transformou o espaço que antes simbolizava isolamento e dor em um local de acolhimento, solidariedade e esperança. Mais do que um religioso, foi um verdadeiro agente de transformação humana e social.",
    autor: "Dom Frei Luiz Flávio Cappio, OFM",
    papel: "Bispo franciscano, confrade e amigo",
  },
  {
    texto:
      "Me sinto honrada e abençoada de ser irmã do Rui. Sua vida sempre foi de uma simplicidade exemplar. Nas suas vindas à casa da família, transmitia uma paz imensa e nos motivava: o ambiente da casa ficava diferente, alegre.",
    autor: "Norma Depiné",
    papel: "Irmã",
  },
  {
    texto:
      "No São Roque foi um bravo lutador dos pobres e doentes. Lidava com poderosos e com os mais miseráveis, mas a todos tratava por igual. Não reteve nada para si.",
    autor: "Orlando Jair Depiné",
    papel: "Irmão",
  },
  {
    texto:
      "Frei Rui é diferente, é um homem sincero, humilde, ajuda os pobres. Essa proximidade com os empobrecidos foi uma constante na vida dele, e impressionou a todos nós. Não se apegou às honrarias deste mundo; evitou os palcos e as promoções humanas.",
    autor: "Ir. Hugo Depiné, Marista",
    papel: "Primo-irmão",
  },
  {
    texto:
      "Nas férias, reunia os primos na casa dos avós para nos ensinar inglês atrás de uma porta de madeira. Trazia bolas do seminário e jogava futebol conosco até não enxergarmos mais a bola.",
    autor: "Memórias da família Depiné",
    papel: "Rodeio (SC)",
  },
  {
    texto:
      "Sempre perseguido, mas era alegre. Nunca se rendeu ao erro nem à injustiça. Podiam bater, pois seu nome era resiliência.",
    autor: "Milene Martos Chagas",
    papel: "Pesquisadora da memória de Frei Rui",
  },
];

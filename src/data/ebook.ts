export type Capitulo = {
  numero: string;
  titulo: string;
};

export const ebook = {
  titulo: "Frei Rui",
  subtitulo: "A vida e o legado de Frei Rui Guido Depiné, OFM",
  autores: [
    "Milene Martos Chagas",
    "Ir. Franciscana Natalícia Eger",
    "Ir. Marista Hugo Depiné",
    "Orlando Jair Depiné",
    "Henrique Depiné",
  ],
  editora: "Dialética Literária — São Paulo",
  ano: "2026",
  isbn: "978-65-274-1322-6",
  paginas: 180,
  capitulosTotal: 24,
  formato: "Ebook em PDF",
  preco: 74.9,
  entrega: ["download na página", "cópia por e-mail"] as const,
  citacao: {
    texto:
      "Manifestei o teu nome aos homens que do mundo me deste. Eram teus e os destes a mim e eles guardaram a tua palavra.",
    referencia: "Jo 17,6",
  },
  resumo:
    "Biografia escrita a muitas mãos — por quem o viu nascer, crescer, ser ordenado e gastar a vida entre os mais pobres —, do vale de Rodeio à Colônia São Roque, em Piraquara.",
  capitulos: [
    { numero: "I", titulo: "A Páscoa do Frei Rui" },
    { numero: "II", titulo: "Histórico: origens do Frei Rui" },
    { numero: "III", titulo: "Quem era o Frei Rui?" },
    { numero: "IV", titulo: "O Frei Rui e a família Depiné" },
    { numero: "V", titulo: "Segunda Guerra Mundial" },
    { numero: "VI", titulo: "A vocação do Frei Rui" },
    { numero: "VII", titulo: "O caminho do Frei Rui: o sacerdote" },
    { numero: "VIII", titulo: "Hostilidades e desafios" },
    { numero: "IX", titulo: "A reforma do Hospital São Roque" },
    { numero: "X", titulo: "Irmã Inês Wiggers" },
    { numero: "XI", titulo: "Ainda lembrando quem foi o Frei Rui" },
    { numero: "XII", titulo: "Irmãs Franciscanas de São José" },
    { numero: "XIII", titulo: "Hospital São Roque" },
    { numero: "XIV", titulo: "A cadeia da Colônia São Roque" },
    { numero: "XV", titulo: "Liberdade para melhor realizar a obra de Deus" },
    { numero: "XVI", titulo: "A chácara" },
    { numero: "XVII", titulo: "Contando as estrelas" },
    { numero: "XVIII", titulo: "O Frei Rui e Cascavel" },
    { numero: "XIX", titulo: "A viagem para Israel — a Terra Santa" },
    { numero: "XX", titulo: "O talismã" },
    { numero: "XXI", titulo: "História da pedra" },
    { numero: "XXII", titulo: "As poesias" },
    { numero: "XXIII", titulo: "Mensagens de Natal" },
    { numero: "XXIV", titulo: "Histórias do Frei Rui" },
  ] satisfies Capitulo[],
};

export function precoFormatado(valor: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(valor);
}

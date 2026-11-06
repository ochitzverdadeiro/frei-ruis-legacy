// Redes sociais oficiais do Legado Frei Rui.
// Arquivo livre de imports de assets/aliases: pode ser lido direto por `node --test`.

export type Rede = {
  id: "instagram" | "facebook" | "youtube";
  rotulo: string;
  url: string;
};

export const redes: Rede[] = [
  {
    id: "instagram",
    rotulo: "Instagram",
    url: "https://www.instagram.com/freiruidepineofficial/",
  },
  {
    id: "facebook",
    rotulo: "Facebook",
    url: "https://www.facebook.com/freiruidepineofficial/",
  },
  {
    id: "youtube",
    rotulo: "YouTube",
    url: "https://www.youtube.com/@freiruidepineofficial",
  },
];

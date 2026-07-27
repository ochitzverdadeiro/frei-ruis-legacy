import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";

const navegacao = [
  { to: "/", rotulo: "Início" },
  { to: "/historia", rotulo: "História" },
  { to: "/linha-do-tempo", rotulo: "Linha do Tempo" },
  { to: "/galeria", rotulo: "Galeria" },
  { to: "/depoimentos", rotulo: "Depoimentos" },
  { to: "/homenagens", rotulo: "Homenagens" },
  { to: "/contato", rotulo: "Contato" },
] as const;

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-light text-foreground">404</h1>
        <h2 className="mt-4 text-xl text-foreground">Página não encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          O endereço que você procura não existe ou foi movido.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl text-foreground">Esta página não carregou</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo deu errado por aqui. Tente novamente ou volte ao início.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Tentar novamente
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Ir para o início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Memorial Frei Rui Guido Depiné" },
      {
        name: "description",
        content:
          "Memorial dedicado à vida e ao legado de Frei Rui Guido Depiné, OFM (1942–2020).",
      },
      { name: "author", content: "Família Depiné" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Karla:wght@300;400;500;600&display=swap",
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Cabecalho() {
  const [aberto, setAberto] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link to="/" className="group flex flex-col leading-tight" onClick={() => setAberto(false)}>
          <span className="eyebrow">Memorial</span>
          <span className="font-serif text-xl text-foreground transition-colors group-hover:text-accent">
            Frei Rui Guido Depiné
          </span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navegacao.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-accent" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="text-sm transition-colors hover:text-foreground"
            >
              {item.rotulo}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          onClick={() => setAberto((v) => !v)}
          className="rounded-md border border-border p-2 text-foreground lg:hidden"
        >
          {aberto ? <X className="size-4" /> : <Menu className="size-4" />}
        </button>
      </div>

      {aberto ? (
        <nav className="border-t border-border/70 bg-background px-5 pb-4 lg:hidden">
          {navegacao.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setAberto(false)}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-accent" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="block border-b border-border/50 py-3 text-sm last:border-0"
            >
              {item.rotulo}
            </Link>
          ))}
        </nav>
      ) : null}
    </header>
  );
}

function Rodape() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-secondary/60">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-serif text-lg text-foreground">Frei Rui Guido Depiné, OFM</p>
          <p className="mt-1 text-sm text-muted-foreground">8/10/1942 — 12/06/2020</p>
          <p className="mt-4 max-w-xs font-serif text-base italic text-muted-foreground">
            “A vida é uma esperança que caminha.”
          </p>
        </div>
        <div>
          <p className="eyebrow">Navegue</p>
          <ul className="mt-3 space-y-2">
            {navegacao.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Memória viva</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Este memorial é mantido pela família Depiné e por amigos, para que a história de
            Frei Rui continue inspirando novas gerações.
          </p>
          <p className="mt-4 text-xs text-muted-foreground">Paz e Bem.</p>
        </div>
      </div>
    </footer>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <Cabecalho />
        <main className="flex-1">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <Rodape />
      </div>
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { listarHomenagens } from "@/lib/homenagens.functions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/homenagens")({
  head: () => ({
    meta: [
      { title: "Deixe sua Homenagem — Frei Rui Guido Depiné" },
      {
        name: "description",
        content:
          "Envie uma mensagem ou uma foto em homenagem a Frei Rui Guido Depiné e leia as homenagens já publicadas.",
      },
      { property: "og:title", content: "Deixe sua Homenagem — Frei Rui Guido Depiné" },
      {
        property: "og:description",
        content: "Um espaço aberto para as memórias de quem foi tocado por Frei Rui.",
      },
    ],
  }),
  component: Homenagens,
});

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100, "Nome muito longo"),
  cidade: z.string().trim().max(100, "Cidade muito longa"),
  relacao: z.string().trim().max(100, "Texto muito longo"),
  mensagem: z
    .string()
    .trim()
    .min(10, "Escreva ao menos 10 caracteres")
    .max(2000, "Máximo de 2000 caracteres"),
});

const TAMANHO_MAX = 5 * 1024 * 1024;

function Homenagens() {
  const buscar = useServerFn(listarHomenagens);
  const { data: homenagens, isLoading } = useQuery({
    queryKey: ["homenagens"],
    queryFn: () => buscar(),
  });

  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const parsed = schema.safeParse({
      nome: String(fd.get("nome") ?? ""),
      cidade: String(fd.get("cidade") ?? ""),
      relacao: String(fd.get("relacao") ?? ""),
      mensagem: String(fd.get("mensagem") ?? ""),
    });

    if (!parsed.success) {
      const novos: Record<string, string> = {};
      for (const issue of parsed.error.issues) novos[String(issue.path[0])] = issue.message;
      setErros(novos);
      return;
    }
    setErros({});

    const arquivo = fd.get("foto");
    const foto = arquivo instanceof File && arquivo.size > 0 ? arquivo : null;
    if (foto) {
      if (!foto.type.startsWith("image/")) {
        toast.error("O arquivo enviado precisa ser uma imagem.");
        return;
      }
      if (foto.size > TAMANHO_MAX) {
        toast.error("A imagem deve ter no máximo 5 MB.");
        return;
      }
    }

    setEnviando(true);
    try {
      let caminho: string | null = null;
      if (foto) {
        const ext = foto.name.split(".").pop()?.toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
        caminho = `envios/${crypto.randomUUID()}.${ext}`;
        const { error: erroUpload } = await supabase.storage
          .from("homenagens")
          .upload(caminho, foto, { contentType: foto.type });
        if (erroUpload) throw new Error(erroUpload.message);
      }

      const { error } = await supabase.from("homenagens").insert({
        nome: parsed.data.nome,
        cidade: parsed.data.cidade || null,
        relacao: parsed.data.relacao || null,
        mensagem: parsed.data.mensagem,
        foto_url: caminho,
      });
      if (error) throw new Error(error.message);

      form.reset();
      setEnviado(true);
      toast.success("Homenagem recebida. Obrigado por compartilhar.");
    } catch {
      toast.error("Não foi possível enviar agora. Tente novamente em instantes.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <p className="eyebrow">Homenagens</p>
      <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">Deixe sua homenagem</h1>
      <span className="rule-gold mt-6" />
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Se Frei Rui cruzou o seu caminho, conte-nos. Cada lembrança enviada passa por uma leitura
        da família antes de ser publicada nesta página.
      </p>

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <section className="surface-parchment rounded-lg border border-border p-7">
          {enviado ? (
            <div className="py-10 text-center">
              <h2 className="font-serif text-2xl text-foreground">Obrigado</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Sua homenagem foi recebida e será lida com carinho pela família.
              </p>
              <Button variant="outline" className="mt-6" onClick={() => setEnviado(false)}>
                Enviar outra homenagem
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div>
                <Label htmlFor="nome">Seu nome</Label>
                <Input id="nome" name="nome" maxLength={100} className="mt-1.5" required />
                {erros.nome ? (
                  <p className="mt-1 text-xs text-destructive">{erros.nome}</p>
                ) : null}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="cidade">Cidade (opcional)</Label>
                  <Input id="cidade" name="cidade" maxLength={100} className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="relacao">Como o conheceu (opcional)</Label>
                  <Input
                    id="relacao"
                    name="relacao"
                    maxLength={100}
                    placeholder="Familiar, amigo, paroquiano…"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="mensagem">Sua mensagem</Label>
                <Textarea
                  id="mensagem"
                  name="mensagem"
                  rows={6}
                  maxLength={2000}
                  className="mt-1.5"
                  required
                />
                {erros.mensagem ? (
                  <p className="mt-1 text-xs text-destructive">{erros.mensagem}</p>
                ) : null}
              </div>

              <div>
                <Label htmlFor="foto">Foto (opcional, até 5 MB)</Label>
                <Input
                  id="foto"
                  name="foto"
                  type="file"
                  accept="image/*"
                  className="mt-1.5 file:mr-3 file:text-xs file:text-muted-foreground"
                />
              </div>

              <Button type="submit" disabled={enviando} className="w-full">
                {enviando ? "Enviando…" : "Enviar homenagem"}
              </Button>
            </form>
          )}
        </section>

        <section>
          <h2 className="font-serif text-2xl text-foreground">Homenagens publicadas</h2>
          <div className="mt-6 space-y-5">
            {isLoading ? (
              <p className="text-sm text-muted-foreground">Carregando homenagens…</p>
            ) : homenagens && homenagens.length > 0 ? (
              homenagens.map((h) => (
                <article key={h.id} className="rounded-lg border border-border bg-card p-6">
                  {h.fotoUrl ? (
                    <img
                      src={h.fotoUrl}
                      alt={`Foto enviada por ${h.nome}`}
                      loading="lazy"
                      className="mb-4 max-h-72 w-full rounded-md object-cover"
                    />
                  ) : null}
                  <p className="font-serif text-lg leading-relaxed italic text-foreground">
                    “{h.mensagem}”
                  </p>
                  <p className="mt-4 text-sm font-medium text-foreground">{h.nome}</p>
                  <p className="text-xs text-muted-foreground">
                    {[h.relacao, h.cidade].filter(Boolean).join(" · ")}
                  </p>
                </article>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                Ainda não há homenagens publicadas. A sua pode ser a primeira.
              </p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

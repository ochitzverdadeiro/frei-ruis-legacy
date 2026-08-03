import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, MapPin, Heart } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Legado Frei Rui Guido Depiné" },
      {
        name: "description",
        content:
          "Fale com a família Depiné e com os responsáveis pelo legado de Frei Rui Guido Depiné.",
      },
      { property: "og:title", content: "Contato — Legado Frei Rui Guido Depiné" },
      {
        property: "og:description",
        content: "Um canal aberto para dúvidas, memórias, fotos e documentos.",
      },
    ],
  }),
  component: Contato,
});

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(100, "Nome muito longo"),
  email: z.string().trim().email("E-mail inválido").max(255, "E-mail muito longo"),
  telefone: z.string().trim().max(30, "Telefone muito longo"),
  assunto: z.string().trim().max(150, "Assunto muito longo"),
  mensagem: z
    .string()
    .trim()
    .min(10, "Escreva ao menos 10 caracteres")
    .max(2000, "Máximo de 2000 caracteres"),
});

function Contato() {
  const [enviando, setEnviando] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const parsed = schema.safeParse({
      nome: String(fd.get("nome") ?? ""),
      email: String(fd.get("email") ?? ""),
      telefone: String(fd.get("telefone") ?? ""),
      assunto: String(fd.get("assunto") ?? ""),
      mensagem: String(fd.get("mensagem") ?? ""),
    });

    if (!parsed.success) {
      const novos: Record<string, string> = {};
      for (const issue of parsed.error.issues) novos[String(issue.path[0])] = issue.message;
      setErros(novos);
      return;
    }
    setErros({});
    setEnviando(true);

    const { error } = await supabase.from("mensagens_contato").insert({
      nome: parsed.data.nome,
      email: parsed.data.email,
      telefone: parsed.data.telefone || null,
      assunto: parsed.data.assunto || null,
      mensagem: parsed.data.mensagem,
    });

    setEnviando(false);

    if (error) {
      toast.error("Não foi possível enviar agora. Tente novamente em instantes.");
      return;
    }
    form.reset();
    toast.success("Mensagem enviada. Responderemos assim que possível.");
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <p className="eyebrow">Contato</p>
      <h1 className="mt-3 font-serif text-4xl text-foreground sm:text-5xl">Fale conosco</h1>
      <span className="rule-gold mt-6" />

      <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
        <form
          onSubmit={onSubmit}
          noValidate
          className="surface-parchment space-y-5 rounded-lg border border-border p-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="nome">Nome</Label>
              <Input id="nome" name="nome" maxLength={100} className="mt-1.5" required />
              {erros.nome ? <p className="mt-1 text-xs text-destructive">{erros.nome}</p> : null}
            </div>
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                maxLength={255}
                className="mt-1.5"
                required
              />
              {erros.email ? <p className="mt-1 text-xs text-destructive">{erros.email}</p> : null}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <Label htmlFor="telefone">Telefone (opcional)</Label>
              <Input id="telefone" name="telefone" maxLength={30} className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="assunto">Assunto (opcional)</Label>
              <Input id="assunto" name="assunto" maxLength={150} className="mt-1.5" />
            </div>
          </div>

          <div>
            <Label htmlFor="mensagem">Mensagem</Label>
            <Textarea
              id="mensagem"
              name="mensagem"
              rows={7}
              maxLength={2000}
              className="mt-1.5"
              required
            />
            {erros.mensagem ? (
              <p className="mt-1 text-xs text-destructive">{erros.mensagem}</p>
            ) : null}
          </div>

          <Button type="submit" disabled={enviando}>
            {enviando ? "Enviando…" : "Enviar mensagem"}
          </Button>
        </form>

        <aside className="space-y-8">
          <div>
            <Heart className="size-5 text-accent" />
            <h2 className="mt-3 font-serif text-xl text-foreground">Guardando a memória</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              A família Depiné e os amigos de Frei Rui reúnem relatos, fotografias e documentos.
              Se você tem algo para acrescentar a esta história, escreva.
            </p>
          </div>
          <div>
            <Mail className="size-5 text-accent" />
            <h2 className="mt-3 font-serif text-xl text-foreground">Mensagens</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Use o formulário ao lado. Todas as mensagens chegam diretamente aos responsáveis
              pelo legado.
            </p>
          </div>
          <div>
            <MapPin className="size-5 text-accent" />
            <h2 className="mt-3 font-serif text-xl text-foreground">Lugares da história</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Rodeio (SC), onde nasceu; Piraquara (PR), onde serviu; Bragança Paulista (SP), onde
              descansou.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

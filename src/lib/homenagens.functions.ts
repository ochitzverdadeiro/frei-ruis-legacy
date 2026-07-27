import { createServerFn } from "@tanstack/react-start";

export type HomenagemPublica = {
  id: string;
  nome: string;
  cidade: string | null;
  relacao: string | null;
  mensagem: string;
  fotoUrl: string | null;
  createdAt: string;
};

export const listarHomenagens = createServerFn({ method: "GET" }).handler(
  async (): Promise<HomenagemPublica[]> => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data, error } = await supabaseAdmin
      .from("homenagens")
      .select("id, nome, cidade, relacao, mensagem, foto_url, created_at")
      .eq("publicada", true)
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) throw new Error(error.message);

    const rows = data ?? [];
    const caminhos = rows.map((r) => r.foto_url).filter((p): p is string => Boolean(p));

    const assinadas = new Map<string, string>();
    if (caminhos.length > 0) {
      const { data: signed } = await supabaseAdmin.storage
        .from("homenagens")
        .createSignedUrls(caminhos, 60 * 60 * 24);
      for (const item of signed ?? []) {
        if (item.path && item.signedUrl) assinadas.set(item.path, item.signedUrl);
      }
    }

    return rows.map((r) => ({
      id: r.id,
      nome: r.nome,
      cidade: r.cidade,
      relacao: r.relacao,
      mensagem: r.mensagem,
      fotoUrl: r.foto_url ? (assinadas.get(r.foto_url) ?? null) : null,
      createdAt: r.created_at,
    }));
  },
);

CREATE TABLE public.homenagens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  cidade TEXT,
  relacao TEXT,
  mensagem TEXT NOT NULL,
  foto_url TEXT,
  publicada BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT ON public.homenagens TO anon;
GRANT SELECT, INSERT ON public.homenagens TO authenticated;
GRANT ALL ON public.homenagens TO service_role;

ALTER TABLE public.homenagens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Homenagens publicadas sao visiveis a todos"
  ON public.homenagens FOR SELECT
  TO anon, authenticated
  USING (publicada = true);

CREATE POLICY "Qualquer visitante pode enviar homenagem"
  ON public.homenagens FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(nome) BETWEEN 2 AND 100
    AND char_length(mensagem) BETWEEN 5 AND 2000
    AND (cidade IS NULL OR char_length(cidade) <= 100)
    AND (relacao IS NULL OR char_length(relacao) <= 100)
  );

CREATE TABLE public.mensagens_contato (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  assunto TEXT,
  mensagem TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT ON public.mensagens_contato TO anon;
GRANT INSERT ON public.mensagens_contato TO authenticated;
GRANT ALL ON public.mensagens_contato TO service_role;

ALTER TABLE public.mensagens_contato ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Qualquer visitante pode enviar mensagem de contato"
  ON public.mensagens_contato FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    char_length(nome) BETWEEN 2 AND 100
    AND char_length(email) BETWEEN 5 AND 255
    AND char_length(mensagem) BETWEEN 5 AND 2000
  );
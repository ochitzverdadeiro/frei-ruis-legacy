# Auditoria e publicação — Hostinger Node.js

## Diagnóstico confirmado

O projeto usa React 19, TanStack Start, TanStack Router, Vite 8 e Nitro; não é uma SPA Vite estática. `npm run build` usa `vite.config.ts`, cujo alvo padrão é o ambiente Lovable. A Hostinger precisa do alvo Node separado, não de uma pasta `dist` configurada arbitrariamente.

Em 28/10/2026, `https://legadofreirui.com.br/` respondeu HTTP 200, mas a foto da capa apontava para `/__l5e/assets-v1/e46547c9-ae4a-467e-ad08-d118b1baca07/frei-rui-capa.jpg`, que respondeu HTTP 404 no domínio oficial. O mesmo original respondeu HTTP 200 no site Lovable. Esses caminhos relativos pertencem à infraestrutura de assets do Lovable, inexistente na Hostinger.

Os oito JPGs originais não estão como binários no repositório: estão representados por manifestos versionados em `src/assets/*.jpg.asset.json`. Todos os oito foram recuperados e validados por tamanho e assinatura JPEG. Não há divergências de maiúsculas/minúsculas nem regras de `.gitignore` excluindo esses manifestos. `src/assets/hero-amanhecer.jpg` também está versionado, mas não é usado atualmente. O favicon existe em `public/favicon.ico`.

| Original recuperado | Uso preservado |
| --- | --- |
| `frei-rui-capa.jpg` | Capa da página inicial |
| `rodeio-vista.jpg` | História, linha do tempo, galeria |
| `eremiterio.jpg` | História, linha do tempo, galeria |
| `familia-antiga.jpg` | Linha do tempo, galeria |
| `totem-imigrantes.jpg` | Linha do tempo, galeria |
| `lembranca-ordenacao.jpg` | Linha do tempo, galeria |
| `praca-imigrantes.jpg` | Linha do tempo, galeria |
| `igreja-rodeio.jpg` | Galeria |

## Correção sem alterar fotos ou design

`tooling/portable-images.mjs` transforma os URLs dos manifestos em `/images/<nome-original>` somente durante builds. Baixa os bytes originais e os emite no build cliente; o empacotador inclui esses arquivos na parte pública da aplicação. A versão implantada serve as fotos no próprio domínio, sem solicitar `/__l5e/` ao Lovable. Se um original falhar ou mudar de tamanho, o build falha explicitamente em vez de publicar imagens quebradas.

Os manifestos CDN permanecem no código-fonte conforme o fluxo de assets do projeto. Para recuperar um original manualmente, combine o `url` do respectivo manifesto com `https://frei-ruis-legacy.lovable.app`. Esse acesso é necessário no momento do build, não para visitantes depois da publicação. Os arquivos não foram substituídos por novas imagens.

As fotos adicionais da galeria seguem o mesmo fluxo: originais preservados em assets CDN e empacotados para servir no domínio Hostinger.

## Publicação na aplicação Node.js da Hostinger

1. Aguarde a sincronização das alterações com a branch GitHub usada pela Hostinger. A existência de arquivos aqui não confirma o estado da sincronização remota.
2. Use Node.js 22 e mantenha as variáveis públicas `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` já configuradas no ambiente de build. Não coloque chaves privadas em variáveis `VITE_*`.
3. Comando de instalação: `npm install` (o repositório usa `bun.lock`, não `package-lock.json`; `npm ci` exigiria um lockfile npm).
4. Comando de build: **`npm run build:hostinger`**.
5. Comando de inicialização: **`npm start`**, equivalente a `node .output/server/index.mjs`.
6. Se o painel pedir o diretório de saída, use **`.output`**. O ponto de entrada é **`.output/server/index.mjs`**; mantenha também **`.output/public`**, com `images/` e os assets JS/CSS. Não publique apenas `dist` ou apenas o servidor. Confirme esses caminhos no log do build Node antes de implantar.
7. Preserve a porta atribuída pela Hostinger (`PORT`) e faça o domínio apontar para essa aplicação Node. Não substitua por upload estático em `public_html`.
8. Faça nova implantação e limpe eventual cache da Hostinger/CDN.

Em VPS, execute os mesmos comandos, mantenha o processo Node ativo com o gerenciador de processos existente e encaminhe o domínio HTTPS para a porta do processo. A configuração específica do painel/proxy não foi inspecionada.

## Verificação obrigatória depois de publicar

- Abra `https://legadofreirui.com.br/images/frei-rui-capa.jpg`: precisa retornar HTTP 200 e `image/jpeg`, não uma página HTML.
- Confira também os outros sete caminhos `/images/` da tabela e os novos arquivos da galeria.
- Na página inicial, História, Linha do Tempo e Galeria, confirme que os JPGs vêm do domínio oficial e que nenhuma requisição de imagem depende de `/__l5e/assets-v1/`.
- Abra uma imagem ampliada na galeria, atualize a página em `/historia` e `/galeria` e confira ausência de erros.

Teste automatizado da regra de empacotamento: `npm run test:images`.

## Limites da validação

A compilação Lovable é executada automaticamente pela plataforma. O build Node específico da Hostinger e a nova implantação precisam ser executados no ambiente Hostinger; não foram executados neste sandbox. O domínio só estará corrigido após essa implantação e a verificação acima.

Fotos enviadas em Homenagens são dados do armazenamento Lovable Cloud, não arquivos do GitHub. A função existente já gera URLs assinados; não foi necessário alterar permissões nem tornar o bucket público. A configuração Node para leitura dessas homenagens depende de credenciais privadas já usadas pelo servidor; elas não estão disponíveis para exportação no Lovable Cloud. Essa funcionalidade precisa de validação separada na Hostinger e não deve ser confundida com as oito imagens editoriais corrigidas. Google Fonts continua sendo uma dependência externa pública, não exclusiva do Lovable.
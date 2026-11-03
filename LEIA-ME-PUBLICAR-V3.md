# FÁBRICA DE VENDAS COM IA — ATUALIZAÇÃO VISUAL V3

Esta versão parte dos arquivos da página anterior e preserva os textos de todas as seções, exceto a **headline aprovada** e a remoção do preço nos textos dos botões. A subheadline está 100% igual.

## Alterações solicitadas
- Topo: novo visual com grid discreto, degradê preto-verde e verde-lima nos destaques.
- Paleta: preto (#070B08), verde-lima (#CFFF2E) e branco suave (#F5F5F0). Sem âmbar.
- Logotipo trocado por imagem em `assets/logo.png` (temporária: basta substituir pelo seu arquivo com **o mesmo nome**).
- Foto de Lucas Valério em `assets/lucas-valerio.webp` (arquivo demonstrativo marcado ADICIONE SUA FOTO; substitua pela imagem real).
- Barra de preço fixa no celular removida.
- Textos dos botões sem preço. O preço de R$ 97 aparece na seção de investimento, preservada.
- Novo carrossel de provas ao final do bloco do método; slides demonstrativos devem ser substituídos por resultados/depoimentos verdadeiros.

## Como inserir as mídias via GitHub
Faça upload substituindo **exatamente os arquivos abaixo**, com estes mesmos nomes:

| Tipo | Caminho |
|---|---|
| Logo | `assets/logo.png` |
| Foto pessoal | `assets/lucas-valerio.webp` |
| Print de resultado 1 | `assets/provas/resultado-01.webp` |
| Print de resultado 2 | `assets/provas/resultado-02.webp` |
| Depoimento em imagem 1 | `assets/provas/depoimento-01.webp` |
| Depoimento em imagem 2 | `assets/provas/depoimento-02.webp` |
| Capa de vídeo 1 | `assets/provas/video-01-thumb.webp` |
| Capa de vídeo 2 | `assets/provas/video-02-thumb.webp` |
| Depoimento em vídeo 1 | `assets/videos/depoimento-01.mp4` |
| Depoimento em vídeo 2 | `assets/videos/depoimento-02.mp4` |

Os vídeos MP4 **não estão no ZIP**, pois você vai enviá-los ao GitHub. Até lá, o carrossel tem capas com texto de placeholder e, ao tentar reproduzir, mostrará a falta do vídeo.

Formatos recomendados: prints em WebP (largura 800-1200px); capa 740x620px (pode ter outra proporção, com `object-fit: contain`); foto vertical (780x900px); vídeos MP4 codificados em H.264/AAC, preferencialmente comprimidos para não sobrecarregar o GitHub/Vercel.

Não apresente resultados de trabalhos anteriores como se tivessem sido obtidos por alunos do novo treinamento. A seção já inclui essa distinção.

## Publicação
1. Envie todos os arquivos e pastas do ZIP para a raiz do repositório. Preserve a estrutura `/assets`.
2. Edite `script.js` e preencha `checkoutUrl: 'https://...'` com o checkout real.
3. Faça commit e aguarde o deploy da Vercel.
4. Valide a compra, links, responsividade, imagens e vídeos.

Sem checkout preenchido, o botão final não efetua compra e exibe um aviso.

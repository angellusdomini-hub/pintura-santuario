# Votação Consultiva — Santuário do Divino Espírito Santo

Site responsivo com as duas propostas de pintura, fotos fornecidas e identidade visual do Santuário. HTML, CSS e JavaScript puros, sem instalação ou compilação.

## Conferir

Abra `index.html` no navegador. A versão entregue está em modo de conferência: permite selecionar uma proposta, mas não envia votos.

## Colocar no GitHub

1. Extraia o ZIP.
2. Crie um repositório no GitHub e envie o conteúdo desta pasta para a raiz do repositório. O arquivo `index.html` deve ficar na raiz, junto de `style.css`, `app.js` e da pasta `assets`.
3. Salve os arquivos no repositório.

## Publicar o site após aprovação

No repositório, abra Settings → Pages. Na seção de publicação, selecione a publicação por branch, escolha `main` e a pasta `/ (root)`, e salve. Aguarde o GitHub informar o endereço do site.

## Abrir a votação após aprovação

O Google Forms e a planilha de respostas já foram criados e vinculados. Antes de abrir a consulta:

1. Na conta Google proprietária, abra o formulário “Consulta de cores — Santuário do Divino Espírito Santo”. Confira a pergunta obrigatória de múltipla escolha e as duas opções.
2. Mantenha desativada a coleta de e-mails e não acrescente campos de identificação. A opção de limitar a uma resposta exige login e foi deixada desativada.
3. Publique o formulário e confira o acesso dos participantes.
4. Em `app.js`, altere `open: false` para `open: true`.
5. Em `index.html`, remova a faixa inicial `<div class="review">...</div>`.
6. Atualize esses arquivos no GitHub e verifique o fluxo antes de divulgar o endereço.

O endereço do Google Forms e o identificador da pergunta estão configurados em `app.js`. Ao confirmar a escolha, o participante abre o Google Forms com a opção preenchida e clica em **Enviar**. Só então o voto é registrado na planilha. Não há envio direto ou confirmação falsa de recebimento.

Nenhum voto de teste foi enviado nesta versão. O recebimento real precisa ser conferido após a abertura do formulário.

Uma opção por envio não impede que uma mesma pessoa responda mais de uma vez. O site não inclui rastreamento de pessoas ou dispositivos.

## Arquivos

- `index.html`: conteúdo da página.
- `style.css`: aparência e adaptação ao celular.
- `app.js`: seleção, conferência e encaminhamento ao Google Forms.
- `assets/`: fotos das propostas e logotipo.
- `.nojekyll`: serve os arquivos como site estático no GitHub Pages.

Os links administrativos e da planilha de respostas não estão incluídos neste pacote destinado ao repositório.

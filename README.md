# API de Data e Hora

Aplicação frontend em React que consulta uma API HTTP externa e exibe a data e a hora retornadas. O frontend é construído com Vite e pode ser publicado no Vercel; a API é executada separadamente.

## Como funciona

O app faz uma requisição `GET` para a URL definida em `VITE_API_URL`:

- ao carregar a página;
- a cada segundo, enquanto a URL estiver configurada;
- quando a pessoa seleciona **Atualizar agora**.

A resposta deve ser JSON com os campos `hora` e `data`, ambos como texto. Por exemplo:

```json
{
  "hora": "21:22:31",
  "data": "18/11/2026"
}
```

O frontend usa esses valores diretamente para preencher a tela. Portanto, `VITE_API_URL` precisa conter a URL completa do endpoint que retorna esse JSON — incluindo o caminho, caso a API use um. O exemplo atualmente configurado no arquivo `.env.example` é `https://api-data-hora-ccri.onrender.com`.

## Executar localmente

Requisitos: Node.js e npm.

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env.local` na raiz do projeto e configure a URL do endpoint:

   ```env
   VITE_API_URL=https://api-data-hora-ccri.onrender.com
   ```

   Se o endpoint estiver em outro caminho, informe a URL completa, por exemplo `https://exemplo.onrender.com/api/datetime`.

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

O Vite informará o endereço local para abrir no navegador. Para gerar e testar a versão de produção localmente:

```bash
npm run build
npm run preview
```

Os arquivos gerados ficam no diretório `dist/`.

## Publicar no Vercel

1. Importe este repositório no Vercel.
2. Configure a variável de ambiente `VITE_API_URL` com a URL completa do endpoint da API.
3. Faça o deploy. O Vercel detecta o Vite; se for necessário informar os parâmetros manualmente, use:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

As variáveis `VITE_*` são incorporadas ao frontend durante o build. Depois de alterar `VITE_API_URL` no Vercel, faça um novo deploy.

## Requisitos para a API

- Responder a uma requisição `GET` com JSON válido contendo `hora` e `data`.
- Permitir requisições CORS vindas do domínio do frontend publicado no Vercel.
- Estar acessível por HTTPS em produção.

Se `VITE_API_URL` não estiver configurada, o frontend informa isso na tela. Se a API responder com erro HTTP ou não estiver acessível, a tela exibirá uma mensagem de falha na consulta.

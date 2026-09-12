# 🎬 CineDash — Instruções de Uso & Guia do Projeto

## 📌 Projeto Escolhido

**CineDash** — Dashboard moderno de curadoria e descoberta de filmes consumindo a [TMDB API](https://developer.themoviedb.org/docs/getting-started).

A aplicação permite explorar lançamentos e filmes em destaque, filtrar por múltiplos critérios (gênero, ano, nota e ordenação), pesquisar em tempo real, visualizar detalhes completos com trailer do YouTube, gerenciar uma Watchlist personalizada com persistência em `localStorage` e alternar temas (Dark/Light).

---

## 🎨 Protótipo & Design no Figma

O layout, componentes e identidade visual da aplicação foram **totalmente inspirados no protótipo desenvolvido no Figma**:

> ### 🔗 **[Abrir o Protótipo no Figma](https://www.figma.com/community/file/1680570364845382959)**  
> **URL direta:** `https://www.figma.com/community/file/1680570364845382959`

---

## 💻 Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:
- **Node.js** (versão 20.x ou 22.x recomendada)
- **npm** (ou gerenciador de sua preferência)
- Conta gratuita no [The Movie Database (TMDB)](https://www.themoviedb.org/) para gerar o token de API

---

## ⚙️ Configuração do Ambiente

### 1. Instalar as dependências

Na raiz do projeto, execute:

```bash
npm install
```

### 2. Configurar as variáveis de ambiente

Copie o arquivo de exemplo `.env.example` para `.env` (ou `.env.local`):

```bash
cp .env.example .env
```

Abra o arquivo `.env` e configure suas chaves:

```env
# Token de leitura da API TMDB (Bearer Token)
VITE_TMDB_ACCESS_TOKEN=seu_token_aqui

# URL base da API TMDB
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

#### 🔑 Como obter o seu token da TMDB:
1. Acesse [themoviedb.org](https://www.themoviedb.org/) e faça login (ou crie sua conta).
2. Vá em **Configurações da Conta** (clicando no seu avatar) → **API**.
3. Em "Solicitar chave de API", crie uma chave do tipo *Developer* caso ainda não tenha.
4. Copie o **API Read Access Token** (o token longo JWT / Bearer token).
5. Cole o valor na variável `VITE_TMDB_ACCESS_TOKEN`.

---

## 🚀 Rodando o Projeto

### Modo Desenvolvimento

Inicia o servidor Vite com Hot Module Replacement (HMR):

```bash
npm run dev
```

Acesse a aplicação em `http://localhost:5173`.

### Modo Produção (Build & Preview)

Para validar a tipagem TypeScript, gerar o bundle de produção e rodar a pré-visualização:

```bash
npm run build
npm run preview
```

Acesse a versão de produção em `http://localhost:4173`.

---

## 🔐 Autenticação Simulada

- A aplicação conta com autenticação client-side simulada com validação via **Zod**.
- **Para logar:** utilize qualquer e-mail com formato válido (ex: `usuario@cinedash.com`) e qualquer senha com **pelo menos 6 caracteres**.
- O estado de autenticação é persistido automaticamente no **`localStorage`** (`auth-storage`) via Zustand.
- Rotas protegidas (como `/discovery`, `/watchlist` e `/movies/:id`) redirecionam para `/login` caso o usuário não esteja autenticado.

---

## 🧪 Executando os Testes

A suíte de testes unitários e de integração utiliza **Vitest** e **Testing Library**:

```bash
# Executa todos os testes e exibe o resumo
npm test

# Executa os testes em modo interativo (watch)
npm run test:watch
```

---

## 📁 Estrutura do Projeto (Feature-Sliced Design)

O código foi arquitetado seguindo os princípios do **Feature-Sliced Design (FSD)**:

```txt
src/
├── app/                  # Configurações globais, providers (QueryClient) e roteador
│   ├── providers/        # Provedores de contexto
│   ├── router/           # Definição e árvore de rotas (TanStack Router)
│   └── styles/           # Estilos globais e configuração do Tailwind CSS v4
│
├── pages/                # Camada de composição de páginas (telas completas)
│   ├── discovery/        # Página principal de exploração e filtros
│   ├── movie-details/    # Página de detalhes e trailer do filme
│   ├── signin/           # Página de login
│   └── watchlist/        # Página da tabela e gestão de watchlist
│
├── widgets/              # Blocos de interface autônomos e compostos
│   ├── header/           # Cabeçalho global com navegação, tema e logout
│   ├── movie-details/    # Card expansivo e trailer embed
│   ├── movies-filters/   # Painel consolidado de busca e filtros
│   ├── movies-list/      # Grid de cards de filmes com paginação e skeletons
│   └── watchlist-table/  # Tabela rica com ordenação e ações via TanStack Table
│
├── features/             # Interações e fluxos com valor de negócio
│   ├── auth/             # Fluxos de signin e logout
│   ├── filter-movies/    # Lógica e componentes de filtros (chips, slider, busca)
│   ├── theme/            # Alternância de tema dark/light
│   └── watchlist/        # Store e ações de adicionar/remover da watchlist
│
├── entities/             # Regras de negócio, modelos e contratos de domínio
│   ├── auth/             # Store de autenticação e tipos de usuário
│   └── movie/            # Chamadas de API do TMDB, types e helpers
│
└── shared/               # Recursos compartilhados e independentes de domínio
    ├── api/              # Cliente HTTP configurado (Axios + TMDB)
    ├── constants/        # Constantes estáticas e metadados
    ├── hooks/            # Hooks utilitários (ex: useDebounce)
    ├── lib/              # Funções utilitárias (ex: cn para classes Tailwind)
    └── ui/               # Componentes visuais base reutilizáveis (shadcn/ui)
```

---

## 🛠️ Scripts Úteis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o ambiente de desenvolvimento |
| `npm run build` | Compila o projeto com TypeScript e empacota via Vite |
| `npm run preview` | Sobe o servidor local para validar o bundle gerado |
| `npm run test` | Roda a suíte completa de testes com Vitest |
| `npm run test:watch` | Roda os testes com auto-reload a cada alteração |
| `npm run lint` | Executa o linter ESLint no projeto |

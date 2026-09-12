# 🎬 CineDash

> Dashboard moderno e intuitivo para curadoria e descoberta de filmes consumindo a **[TMDB API](https://developer.themoviedb.org/docs/getting-started)**.

---

## 🎨 Protótipo & Design (Figma)

> 🔗 **Layout e identidade visual inspirados no protótipo da comunidade do Figma:**  
> ### 👉 **[Clique aqui para abrir o projeto no Figma](https://www.figma.com/community/file/1680570364845382959)**  
> Link direto: `https://www.figma.com/community/file/1680570364845382959`

---

Construído com **React 19**, **TypeScript**, **Vite**, **Tailwind CSS v4**, **TanStack Router**, **TanStack Query**, gerenciamento de estado via **Zustand** e estruturado seguindo o padrão **Feature-Sliced Design (FSD)**.

---

## ✨ O que tem na aplicação?

### 🔐 Autenticação Simulada
- Formulário tipado e validado via **[Zod](https://zod.dev/)** + **React Hook Form**.
- Sessão persistida em **`localStorage`** com o middleware `persist` do **Zustand**.
- Rotas protegidas com _route guards_ nativos do **[TanStack Router](https://tanstack.com/router/latest)** (redireciona automaticamente caso o usuário não esteja autenticado).

### 🍿 Discovery (Exploração & Filtros)
- Listagem dos filmes em destaque da semana.
- Busca em tempo real com _debounce_ de 400ms.
- **Filtros combináveis**:
  - Gêneros cinematográficos (chips interativos);
  - Ano de lançamento (range de anos);
  - Nota mínima (slider interativo de rating);
  - Ordenação por popularidade, título ou avaliação.
- **Sincronização com a URL**: filtros e paginação são refletidos na query string como fonte única de verdade (fácil de compartilhar links ou usar o histórico do navegador).
- Feedback visual durante carregamento com _skeletons_ customizados.

### 📌 Watchlist Interativa
- Adição e remoção de filmes salvos em `localStorage`.
- Visualização em tabela completa via **[TanStack Table](https://tanstack.com/table/latest)**: ordenação por colunas e filtro por título.
- Modal de confirmação para remoções e feedback imediato via toasts (**Sonner**).
- Design responsivo adaptado para desktop e mobile.

### 🎥 Detalhes do Filme
- Página dedicada com sinopse, gêneros, elenco principal e metadados.
- Player de trailer integrado com embed seguro do YouTube.
- Ação rápida para salvar ou remover da sua Watchlist.

### 🌓 Tema Dark / Light
- Alternância rápida entre modos claro e escuro com preferência salva no navegador (`localStorage`).

---

## 🏗️ Arquitetura (Feature-Sliced Design)

O projeto foi estruturado seguindo o padrão **[Feature-Sliced Design (FSD)](https://feature-sliced.design/)**, organizando o código em camadas com limites bem definidos de responsabilidade:

```txt
src/
├── app/        # Inicialização da app, providers globais, router e estilos
├── pages/      # Views completas correspondentes às rotas
├── widgets/    # Blocos compostos e autônomos (Header, MoviesFilters, WatchlistTable...)
├── features/   # Casos de uso e interações (auth/signin, auth/logout, filter-movies, theme...)
├── entities/   # Modelos de domínio, tipos e stores de entidade (movie, auth...)
└── shared/     # Componentes base (shadcn/ui), api clients (TMDB), hooks e utils
```

- **Code Splitting**: carregamento sob demanda por rota com `lazyRouteComponent`.
- **Cache Otimizado**: gerenciamento de estado assíncrono com **TanStack Query**, configurado com `staleTime` para evitar chamadas redundantes à API.
- **Acessibilidade**: navegação acessível, elementos semânticos e estados descritivos.

---

## 🚀 Como rodar o projeto

### 1. Pré-requisitos
- Node.js (versão 20+ recomendada)
- Gerenciador de pacotes `npm`
- Uma chave de API (**API Read Access Token**) do [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api)

### 2. Configurar Variáveis de Ambiente

Crie um arquivo `.env` (ou `.env.local`) a partir do exemplo:

```bash
cp .env.example .env
```

Preencha com o seu token do TMDB:

```env
# API Read Access Token (Bearer Token do TMDB)
VITE_TMDB_ACCESS_TOKEN=seu_access_token_aqui

# URL base da API
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

### 3. Instalar dependências e iniciar

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Abra no navegador em `http://localhost:5173`.

> 💡 **Para login:** você pode digitar qualquer e-mail válido (ex: `dev@cinedash.app`) e qualquer senha com pelo menos 6 caracteres.

---

## 🧪 Testes

A aplicação conta com suíte de testes unitários e de integração utilizando **Vitest** e **Testing Library**:

```bash
# Executar todos os testes
npm test

# Executar em modo watch interativo
npm run test:watch
```

---

## 🛠️ Scripts Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local de desenvolvimento no Vite |
| `npm run build` | Valida tipagem com TypeScript e gera o bundle de produção |
| `npm run preview` | Sobe um servidor local para testar o bundle de produção |
| `npm run test` | Roda a suíte de testes com Vitest |
| `npm run lint` | Executa o ESLint para análise estática de código |
| `npm run prepare` | Configura os hooks do Husky no Git |

---

## 🤝 Padrão de Commits

O repositório utiliza **Husky** e **Commitlint** para garantir mensagens no padrão Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`, `test:`).


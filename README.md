# React Frontend Challenge

Setup inicial com Vite, React e TypeScript, criado diretamente na pasta atual.

## Inicializacao

Comando usado para criar o projeto sem gerar uma nova pasta:

```bash
npm create vite@latest . -- --template react-ts
npm install
```

No prompt do Vite, foi escolhido `ESLint` como linter.

## Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Estrutura

```txt
src/
  main.tsx
  App.tsx
  components/
    HelloWorld.tsx
  styles/
    global.css
```

## Alias de importacao

O alias `@` aponta para `src`.

```ts
import { HelloWorld } from '@/components/HelloWorld'
```

Trecho principal em `vite.config.ts`:

```ts
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },
},
```

Trecho principal em `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Exemplo tipado

```tsx
type HelloWorldProps = {
  name: string
}

export function HelloWorld({ name }: HelloWorldProps) {
  return <p>Hello World com {name}</p>
}
```

## Estilos

Os estilos globais ficam em `src/styles/global.css`. Isso deixa o projeto pronto para receber TailwindCSS futuramente sem instalar agora.

Quando for adicionar Tailwind, este arquivo pode receber a entrada do Tailwind e continuar sendo importado em `src/main.tsx`.

## Rodando

```bash
npm run dev
```

Depois acesse a URL exibida pelo Vite no terminal, normalmente `http://localhost:5173/`.

## Husky + Commitlint

Configuracao para validar automaticamente mensagens de commit no padrao Conventional Commits.

### Instalacao

```bash
npm install --save-dev husky @commitlint/cli @commitlint/config-conventional
npx husky init
```

O comando `npx husky init` adiciona o script `prepare` no `package.json`:

```json
{
  "scripts": {
    "prepare": "husky"
  }
}
```

### Arquivo `.commitlintrc`

```json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "chore", "docs", "refactor", "test"]
    ]
  }
}
```

### Hook `.husky/commit-msg`

```sh
npx --no -- commitlint --config .commitlintrc --edit "$1"
```

Se estiver configurando manualmente, garanta permissao de execucao no hook:

```bash
chmod +x .husky/commit-msg
```

### Commits validos

```bash
git commit -m "feat: add login page"
git commit -m "fix: handle empty response"
git commit -m "chore: update dependencies"
git commit -m "docs: update setup instructions"
git commit -m "refactor: simplify component state"
git commit -m "test: add app render test"
```

### Commits invalidos

```bash
git commit -m "add login page"
git commit -m "feature: add login page"
git commit -m "feat add login page"
```

### Fluxo

Ao executar `git commit`, o Git chama o hook `.husky/commit-msg`. Esse hook executa o `commitlint` lendo a mensagem do commit; se ela nao seguir o padrao configurado, o commit e bloqueado antes de ser criado.

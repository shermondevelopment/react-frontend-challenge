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

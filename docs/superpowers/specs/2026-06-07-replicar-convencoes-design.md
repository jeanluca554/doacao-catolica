# Design: Replicar Convenções devroast em Projeto Existente

**Data:** 2026-06-07
**Status:** Aprovado
**Contexto:** Plano 1 de 2 — convenções e setup. Plano 2 cobrirá o CRUD de Campanhas de Doações.

## Contexto

Projeto existente em React Router v7 + Tailwind v4, com `src/` como diretório raiz. O objetivo é replicar as convenções de código do devroast para que o projeto tenha consistência e sirva de base para desenvolvimento com shadcn/ui, tailwind-variants e Radix UI.

## Fora de escopo

- Migração de código existente para a nova estrutura
- Criação de componentes UI específicos
- CRUD de Campanhas (Plano 2)

## Seção 1: Pacotes

Instalar as seguintes dependências:

| Pacote | Tipo | Motivo |
|---|---|---|
| `tailwind-variants` | dependency | variantes de componentes com merge automático |
| `tailwind-merge` | dependency | merge de classes Tailwind sem conflitos |
| `clsx` | dependency | inputs flexíveis no `cn()` (aceita `false`, `null`, condicionais) |
| `@radix-ui/react-slot` | dependency | prop `asChild` em componentes interativos |

## Seção 2: Configuração shadcn

### `components.json` (raiz do projeto)

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/app.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "~/client/components",
    "utils": "~/lib/utils",
    "ui": "~/client/components/ui",
    "lib": "~/lib",
    "hooks": "~/client/hooks"
  }
}
```

> Ajustar `tailwind.css` para o caminho real do CSS global do projeto (ex: `src/app.css`, `src/styles/global.css`, etc.).

### `src/lib/utils.ts`

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## Seção 3: Estrutura de pastas alvo

```
src/
├── main/
│   └── routes/          # rotas do React Router v7
├── client/
│   ├── components/
│   │   └── ui/          # componentes genéricos reutilizáveis
│   ├── layouts/         # layouts visuais com <Outlet />
│   └── pages/           # componentes de página sem lógica de rota
└── lib/                 # utilitários — *.server.ts só roda no servidor
```

A estrutura é **criada se não existir** — pastas que o projeto já tem são mantidas. O plano de implementação cria apenas as pastas ausentes.

### Convenções de nomenclatura em `routes/`

| Tipo | Arquivo |
|---|---|
| Index | `_index.tsx` |
| Página | `route.<nome>.tsx` |
| Layout adapter | `layout.<nome>Layout.tsx` |
| API | `api.<nome>.ts` |

### Separação de layouts

O layout adapter em `routes/` é thin — apenas loader e ErrorBoundary, sem JSX:

```tsx
// src/main/routes/layout.appLayout.tsx
export async function loader(args: Route.LoaderArgs) { ... }
export function ErrorBoundary() { return <ErrorBoundaryPage />; }
export default AppLayout;
```

A estrutura visual fica em `src/client/layouts/<nome>Layout/index.tsx`:

```tsx
export function AppLayout() {
  return <><Header /><Outlet /></>;
}
```

## Seção 4: Arquivos CLAUDE.md

### `CLAUDE.md` (raiz do projeto)

Documenta stack, estrutura de diretórios, convenções de nomenclatura em `routes/`, regra de separação de layouts e escala numérica do Tailwind.

Conteúdo adaptado do devroast — remover referências específicas do devroast (shiki, tema vesper) e substituir pelo stack do projeto.

### `src/client/components/ui/CLAUDE.md`

Documenta as regras de implementação de componentes UI:

- **Estrutura obrigatória:** `tv()` + `VariantProps` + `ComponentProps<"elemento">`
- **Exports:** sempre named, nunca `export default`
- **Merge de classes:** `tv()` faz merge internamente; sem `tv()`, usar `twMerge`
- **Tokens de cor:** sempre tokens semânticos do CSS, nunca hex avulso
- **Dark mode:** tokens semânticos que respondem à classe `.dark`
- **`"use client"`:** nunca usar — projeto usa React Router v7, não Next.js
- **Primitivos Radix UI:** para componentes interativos acessíveis
- **Workflow shadcn (4 passos):**
  1. Gerar com `npx shadcn@latest add <nome>`
  2. Substituir CVA por `tv()`
  3. Trocar cores hardcoded por tokens do design system
  4. Corrigir exports (named, sem `"use client"`, objeto composto)
- **Padrão de composição:** `export const Card = { Root, Title, Description }`
- **`asChild` no Button:** via `@radix-ui/react-slot`

## Resultado esperado

Ao final do Plano 1, o projeto terá:
- Dependências de UI instaladas e configuradas
- shadcn CLI pronto para `npx shadcn@latest add <componente>`
- Estrutura de pastas alinhada com as convenções devroast
- Documentação CLAUDE.md guiando desenvolvimento futuro

O projeto estará pronto para o Plano 2: CRUD de Campanhas de Doações.

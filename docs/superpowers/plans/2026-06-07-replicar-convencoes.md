# Replicar Convenções devroast — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Configurar dependências de UI e documentação de convenções de código em um projeto React Router v7 + Tailwind v4 existente.

**Architecture:** Instalar tailwind-variants, tailwind-merge, clsx e @radix-ui/react-slot; configurar shadcn CLI via components.json; criar estrutura de pastas alvo; adicionar CLAUDE.md na raiz e em src/client/components/ui/ com as regras de implementação.

**Tech Stack:** React Router v7, React 19, Tailwind CSS v4, tailwind-variants, tailwind-merge, clsx, @radix-ui/react-slot, shadcn/ui CLI

> **Nota:** Este plano é para ser executado no seu projeto, não no devroast. Todos os caminhos são relativos à raiz do seu projeto.

---

## Arquivos envolvidos

| Ação | Arquivo |
|---|---|
| Modificar | `package.json` |
| Modificar | `tsconfig.json` (verificar alias `~/*`) |
| Criar | `components.json` |
| Criar | `src/lib/utils.ts` |
| Criar | `src/main/routes/.gitkeep` (se a pasta não existir) |
| Criar | `src/client/components/ui/.gitkeep` (se a pasta não existir) |
| Criar | `src/client/layouts/.gitkeep` (se a pasta não existir) |
| Criar | `src/client/pages/.gitkeep` (se a pasta não existir) |
| Criar | `CLAUDE.md` |
| Criar | `src/client/components/ui/CLAUDE.md` |

---

## Task 1: Instalar dependências

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Instalar os quatro pacotes**

```bash
npm install tailwind-variants tailwind-merge clsx @radix-ui/react-slot
```

Esperado: os quatro pacotes aparecem em `dependencies` no `package.json`.

- [ ] **Step 2: Verificar tipagem**

```bash
npm run typecheck
```

Esperado: sem erros. Se o projeto não tiver script `typecheck`, usar `npx tsc --noEmit`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install tailwind-variants, tailwind-merge, clsx, @radix-ui/react-slot"
```

---

## Task 2: Configurar shadcn CLI e utilitário `cn`

**Files:**
- Create: `components.json`
- Modify: `tsconfig.json`
- Create: `src/lib/utils.ts`

O `components.json` informa ao shadcn CLI onde depositar componentes gerados e qual alias usar. O utilitário `cn` é referenciado por todo código gerado pelo shadcn. O alias `~/*` precisa estar no tsconfig para que os imports funcionem.

- [ ] **Step 1: Verificar o caminho do CSS global**

```bash
find src -name "*.css" | head -10
```

Anote o caminho do arquivo CSS principal (ex: `src/app.css`, `src/styles/global.css`). Ele será usado no próximo passo.

- [ ] **Step 2: Verificar alias `~/*` no tsconfig**

Abra `tsconfig.json` e verifique se `compilerOptions.paths` contém `"~/*"`. Se não contiver, adicione:

```json
{
  "compilerOptions": {
    "paths": {
      "~/*": ["./src/*"]
    }
  }
}
```

Se o projeto já usa `@/*` ou outro alias, **não altere** — e ajuste os aliases no `components.json` do próximo passo para usar o alias existente.

- [ ] **Step 3: Criar `components.json` na raiz do projeto**

Substitua `"src/app.css"` pelo caminho encontrado no Step 1.

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

- [ ] **Step 4: Criar `src/lib/utils.ts`**

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 5: Verificar tipagem**

```bash
npm run typecheck
```

Esperado: sem erros.

- [ ] **Step 6: Commit**

```bash
git add components.json tsconfig.json src/lib/utils.ts
git commit -m "chore: configure shadcn CLI and add cn utility"
```

---

## Task 3: Criar estrutura de pastas

**Files:**
- Create: `src/main/routes/.gitkeep`
- Create: `src/client/components/ui/.gitkeep`
- Create: `src/client/layouts/.gitkeep`
- Create: `src/client/pages/.gitkeep`

Cria as pastas que ainda não existem. Use `mkdir -p` — é seguro em pastas que já existem (não sobrescreve nada).

- [ ] **Step 1: Criar pastas**

```bash
mkdir -p src/main/routes
mkdir -p src/client/components/ui
mkdir -p src/client/layouts
mkdir -p src/client/pages
mkdir -p src/lib
```

- [ ] **Step 2: Adicionar `.gitkeep` nas pastas que ficaram vazias**

Para cada pasta nova que ficou vazia, adicione um arquivo `.gitkeep` para que o git rastreie a pasta:

```bash
# Verifique quais ficaram vazias:
ls src/main/routes src/client/components/ui src/client/layouts src/client/pages src/lib

# Para cada pasta vazia, crie o .gitkeep:
touch src/client/components/ui/.gitkeep
touch src/client/layouts/.gitkeep
touch src/client/pages/.gitkeep
# (adicione os outros se necessário)
```

- [ ] **Step 3: Verificar estrutura**

```bash
find src/main src/client src/lib -type d | sort
```

Esperado:
```
src/client
src/client/components
src/client/components/ui
src/client/layouts
src/client/pages
src/lib
src/main
src/main/routes
```

- [ ] **Step 4: Commit**

```bash
git add src/
git commit -m "chore: create devroast directory structure"
```

---

## Task 4: Criar `CLAUDE.md` raiz

**Files:**
- Create: `CLAUDE.md`

Documenta o stack, a estrutura de diretórios, as convenções de nomenclatura e as regras de layout para o Claude e para qualquer desenvolvedor no projeto.

- [ ] **Step 1: Criar `CLAUDE.md` na raiz do projeto**

Substitua `[Nome do Projeto]` pelo nome real do seu projeto.

```markdown
# [Nome do Projeto]

## Stack
React Router v7 (SSR) · React 19 · Tailwind CSS v4 · tailwind-variants · shadcn/ui · Radix UI

## Estrutura de diretórios

\`\`\`
src/
├── main/routes/        # rotas: _index.tsx, route.*.tsx, layout.*.tsx, api.*.ts
├── client/
│   ├── components/ui/  # componentes genéricos reutilizáveis (ver CLAUDE.md local)
│   ├── components/     # componentes de aplicação não ligados a uma rota
│   ├── layouts/        # layouts visuais com <Outlet /> → <nome>Layout/index.tsx
│   └── pages/          # componentes de página sem lógica de rota
└── lib/                # utilitários *.server.ts (só rodam no servidor)
\`\`\`

## Convenção de nomes em `src/main/routes/`

| Tipo | Arquivo |
|------|---------|
| Index | `_index.tsx` |
| Página | `route.<nome>.tsx` |
| Layout adapter | `layout.<nome>Layout.tsx` |
| API | `api.<nome>.ts` |

## Layouts (dois arquivos separados)

**`src/main/routes/layout.<nome>Layout.tsx`** — thin adapter, sem JSX:
\`\`\`tsx
export async function loader(args: Route.LoaderArgs) { ... }
export function ErrorBoundary() { return <ErrorBoundaryPage />; }
export default <Nome>Layout;
\`\`\`

**`src/client/layouts/<nome>Layout/index.tsx`** — estrutura visual com `<Outlet />`:
\`\`\`tsx
export function <Nome>Layout() {
  return <><Header /><Outlet /></>;
}
\`\`\`

## Tailwind: escala numérica vs. arbitrário

Tailwind v4 gera utilitários sob demanda (N × 4px). Preferir escala sobre `[Xpx]`:
- `max-w-240` (960px), `h-90` (360px), `w-15` (60px), `translate-x-4.5` (18px)
- Exceção: font sizes sem equivalente na escala → `text-[13px]` permitido

## Componentes UI

Padrão de composição — sub-componentes via objeto exportado:
\`\`\`tsx
export const Card = { Root, Title, Description };
// uso: <Card.Root><Card.Title>…</Card.Title></Card.Root>
\`\`\`

Ver `src/client/components/ui/CLAUDE.md` para todas as regras de implementação.
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: add root CLAUDE.md with project conventions"
```

---

## Task 5: Criar `src/client/components/ui/CLAUDE.md`

**Files:**
- Create: `src/client/components/ui/CLAUDE.md`
- Remove: `src/client/components/ui/.gitkeep` (se existir)

Documenta as regras de implementação de componentes UI reutilizáveis — a referência central para qualquer componente criado ou adaptado do shadcn.

- [ ] **Step 1: Criar `src/client/components/ui/CLAUDE.md`**

```markdown
# Padrões de componentes UI

## Estrutura obrigatória

\`\`\`tsx
import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentProps } from "react";

const component = tv({ ... });

type ComponentVariants = VariantProps<typeof component>;
type ComponentProps = ComponentProps<"elemento"> & ComponentVariants;

export function Component({ className, variant, ...props }: ComponentProps) {
  return <elemento className={component({ variant, className })} {...props} />;
}
\`\`\`

## Regras

**Exports:** sempre named exports. Nunca `export default`.

**Props nativas:** sempre extender `ComponentProps<"elemento">` do React para expor todos os atributos HTML nativos do elemento base.

**Variantes:** usar `tailwind-variants` (`tv`). Inferir os tipos com `VariantProps<typeof component>`.

**Merge de classes:** duas regras, dependendo do uso:

- **Com `tv()`**: passar `className` diretamente no call — `tv()` faz o merge internamente. Nunca usar `twMerge` por cima.
- **Sem `tv()`**: usar `cn()` de `~/lib/utils`. Nunca usar interpolação de string.

\`\`\`tsx
// com tv() — correto
className={button({ variant, size, className })}

// com tv() — errado
className={twMerge(button({ variant, size }), className)}

// sem tv() — correto
className={cn("flex items-center gap-2", className)}

// sem tv() — errado
className={\`flex items-center gap-2 \${className ?? ""}\`}
\`\`\`

**Tokens de cor:** usar sempre os tokens do design system definidos no CSS global, nunca valores hex avulsos.

\`\`\`tsx
// correto
"bg-primary text-primary-foreground"

// errado
"bg-[#10B981] text-[#0A0A0A]"
\`\`\`

**Dark mode:** não hardcodar cores para modo escuro. Usar tokens semânticos (`bg-background`, `text-foreground`, `bg-card`…) que já respondem à classe `.dark` no `<html>`.

**`"use client"`:** nunca usar essa diretiva. O projeto usa React Router v7, não Next.js — hooks e interatividade funcionam normalmente em qualquer componente sem pragma.

**Slots no `tv()`:** para componentes com múltiplos elementos internos estilizados, usar a API `slots` do `tailwind-variants` em vez de múltiplos `tv()` separados.

\`\`\`tsx
const badge = tv({
  slots: {
    root: "inline-flex items-center gap-2",
    dot: "size-2 rounded-full",
    label: "font-mono text-xs",
  },
  variants: {
    variant: {
      active: { dot: "bg-green-500", label: "text-green-500" },
    },
  },
});

// uso: desestruturar os slots e chamar cada um
const { root, dot, label } = badge({ variant });
<span className={root({ className })}>
  <span className={dot()} />
  <span className={label()}>{children}</span>
</span>
\`\`\`

**Primitivos Radix UI:** para componentes com comportamento interativo que exigem acessibilidade (toggle, dialog, select, tooltip…), usar `@radix-ui/react-*` como primitivo e estilizar com Tailwind por cima. Não reinventar roda com `<div>` + handlers manuais.

**Escala Tailwind:** preferir valores da escala numérica do Tailwind (N × 4px) em vez de sintaxe arbitrária `[Xpx]`. Ex: `w-15` (60px), `h-90` (360px), `translate-x-4.5` (18px). Exceção: font sizes sem equivalente na escala (`text-[13px]`) ficam arbitrários.

## Adicionando novos componentes (shadcn/ui)

Para adicionar um componente do catálogo shadcn/ui:

1. **Gerar:** `npx shadcn@latest add <nome>` — o arquivo entra em `src/client/components/ui/`
2. **Substituir CVA por `tv()`:** trocar `cva()` + `VariantProps` de `class-variance-authority` por `tv()` + `VariantProps` de `tailwind-variants`
3. **Trocar tokens:** substituir cores hardcoded (`bg-white`, `text-zinc-900`) pelos tokens do design system
4. **Corrigir exports:** remover `"use client"`, trocar `export default` por named export, agrupar sub-componentes em objeto composto (`export const Dialog = { Root, Title, Content }`)

Se o componente gerado não usa `cva()`, manter `cn()` de `~/lib/utils` para merge de classes.

**`asChild` no Button:** use `<Button asChild><Link to="...">Texto</Link></Button>` para renderizar o botão como elemento filho sem perder variantes. Requer `@radix-ui/react-slot` (já instalado).
```

- [ ] **Step 2: Remover `.gitkeep` se existir**

```bash
rm -f src/client/components/ui/.gitkeep
```

- [ ] **Step 3: Verificar tipagem**

```bash
npm run typecheck
```

Esperado: sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/client/components/ui/
git commit -m "docs: add ui components CLAUDE.md with implementation rules"
```

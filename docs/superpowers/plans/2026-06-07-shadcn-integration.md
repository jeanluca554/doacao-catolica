# shadcn/ui Integration — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir `@base-ui/react` por Radix UI como camada de primitivos, configurar o shadcn/ui CLI para adição futura de componentes, e adicionar `asChild` ao Button.

**Architecture:** O shadcn/ui funciona como catálogo de receitas — o CLI copia código para `src/client/components/ui/`, que é então adaptado às convenções do projeto (`tailwind-variants`, design tokens, named exports). Radix UI assume o papel de primitivos acessíveis anteriormente exercido pelo `@base-ui/react`.

**Tech Stack:** React Router v7, React 19, Tailwind CSS v4, tailwind-variants, @radix-ui/react-slot, @radix-ui/react-switch, shadcn/ui CLI

---

## Arquivos envolvidos

| Ação | Arquivo |
|---|---|
| Criar | `components.json` |
| Criar | `src/lib/utils.ts` |
| Modificar | `src/client/components/ui/button.tsx` |
| Modificar | `src/client/components/ui/toggle.tsx` |
| Modificar | `src/client/components/ui/CLAUDE.md` |
| Modificar | `package.json` (remover `@base-ui/react`) |

---

## Task 1: Configurar shadcn/ui e criar utilitário `cn`

**Files:**
- Create: `components.json`
- Create: `src/lib/utils.ts`

O shadcn CLI usa `components.json` para saber onde colocar arquivos e qual alias de importação usar. Criamos manualmente para evitar que o `shadcn init` modifique o `app.css` (que já tem os tokens do design system). O utilitário `cn` é necessário porque o código gerado pelo CLI o referencia antes de ser adaptado.

- [ ] **Step 1: Criar `components.json` na raiz do projeto**

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

- [ ] **Step 2: Criar `src/lib/utils.ts`**

O arquivo expõe `cn` como alias de `twMerge`. O código gerado pelo shadcn referencia `cn()`; durante a adaptação de cada componente, `cn()` é substituído por `tv()` (para componentes com variantes) ou mantido para componentes simples.

```ts
import { twMerge } from "tailwind-merge";

export function cn(...inputs: Parameters<typeof twMerge>) {
  return twMerge(...inputs);
}
```

- [ ] **Step 3: Verificar tipagem**

```bash
npm run typecheck
```

Esperado: sem erros de TypeScript.

- [ ] **Step 4: Commit**

```bash
git add components.json src/lib/utils.ts
git commit -m "chore: configure shadcn/ui CLI and add cn utility"
```

---

## Task 2: Adicionar `asChild` ao Button

**Files:**
- Modify: `src/client/components/ui/button.tsx`

O prop `asChild` via `@radix-ui/react-slot` permite renderizar o Button como qualquer outro elemento (ex: `<Link>`) sem perder variantes e estilos. Toda a lógica de `tv()` e as variantes existentes permanecem intactas.

- [ ] **Step 1: Instalar `@radix-ui/react-slot`**

```bash
npm install @radix-ui/react-slot
```

- [ ] **Step 2: Atualizar `src/client/components/ui/button.tsx`**

Substituir o conteúdo completo do arquivo por:

```tsx
import { Slot } from "@radix-ui/react-slot";
import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentProps } from "react";

const button = tv({
  base: [
    "inline-flex items-center justify-center gap-2",
    "font-mono font-medium text-[13px]",
    "transition-colors duration-150",
    "cursor-pointer disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page",
  ],
  variants: {
    variant: {
      primary:
        "bg-accent-green text-black enabled:hover:bg-accent-green/90 focus-visible:ring-accent-green",
      secondary:
        "bg-secondary text-secondary-foreground enabled:hover:bg-secondary/80 focus-visible:ring-border",
      outline:
        "border border-accent-green text-accent-green bg-transparent enabled:hover:bg-accent-green/10 focus-visible:ring-accent-green",
      ghost:
        "bg-transparent text-muted-foreground enabled:hover:bg-secondary enabled:hover:text-foreground focus-visible:ring-border",
      destructive:
        "bg-destructive text-white enabled:hover:bg-destructive/90 focus-visible:ring-destructive",
    },
    size: {
      sm: "h-8 px-4 text-xs",
      md: "py-2.5 px-6",
      lg: "h-12 px-8 text-sm",
    },
    rounded: {
      none: "rounded-none",
      md:   "rounded-md",
      m:    "rounded-m",
      pill: "rounded-pill",
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    rounded: "md",
  },
});

type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = ComponentProps<"button"> & ButtonVariants & {
  asChild?: boolean;
};

export function Button({
  className,
  variant,
  size,
  rounded,
  asChild = false,
  ...props
}: ButtonProps) {
  if (asChild) {
    return (
      <Slot className={button({ variant, size, rounded, className })} {...props} />
    );
  }
  return (
    <button
      className={button({ variant, size, rounded, className })}
      {...props}
    />
  );
}
```

- [ ] **Step 3: Verificar tipagem**

```bash
npm run typecheck
```

Esperado: sem erros de TypeScript.

- [ ] **Step 4: Commit**

```bash
git add src/client/components/ui/button.tsx package.json package-lock.json
git commit -m "feat(ui): add asChild prop to Button via @radix-ui/react-slot"
```

---

## Task 3: Migrar Toggle de `@base-ui/react` para `@radix-ui/react-switch`

**Files:**
- Modify: `src/client/components/ui/toggle.tsx`

A API do Radix Switch é equivalente ao base-ui Switch (`Root` + `Thumb`, mesmos props `checked`/`onCheckedChange`/`disabled`). A única diferença visual é o data attribute de estado: `data-[checked]` no base-ui vira `data-[state=checked]` no Radix.

- [ ] **Step 1: Instalar `@radix-ui/react-switch`**

```bash
npm install @radix-ui/react-switch
```

- [ ] **Step 2: Atualizar `src/client/components/ui/toggle.tsx`**

Substituir o conteúdo completo do arquivo por:

```tsx
import * as SwitchPrimitive from "@radix-ui/react-switch";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

type ToggleProps = {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
};

export function Toggle({
  label,
  checked,
  defaultChecked = false,
  onCheckedChange,
  disabled,
  className,
}: ToggleProps) {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  function handleChange(value: boolean) {
    if (!isControlled) setInternalChecked(value);
    onCheckedChange?.(value);
  }

  return (
    <label
      className={twMerge("inline-flex items-center gap-3 cursor-pointer select-none", className)}
    >
      <SwitchPrimitive.Root
        checked={isChecked}
        onCheckedChange={handleChange}
        disabled={disabled}
        className="inline-flex items-center h-5.5 w-10 rounded-full p-0.75 cursor-pointer bg-border-primary transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-accent-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-green focus-visible:ring-offset-2 focus-visible:ring-offset-bg-page"
      >
        <SwitchPrimitive.Thumb className="size-4 rounded-full bg-text-secondary transition-all duration-150 translate-x-0 data-[state=checked]:translate-x-4.5 data-[state=checked]:bg-bg-page" />
      </SwitchPrimitive.Root>
      {label && (
        <span
          className={twMerge(
            "font-mono text-xs transition-colors duration-150",
            isChecked ? "text-accent-green" : "text-text-secondary"
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
}
```

A mudança chave: `data-[checked]:` → `data-[state=checked]:` em todas as classes do `Root` e `Thumb`.

- [ ] **Step 3: Remover `@base-ui/react`**

```bash
npm uninstall @base-ui/react
```

- [ ] **Step 4: Verificar tipagem**

```bash
npm run typecheck
```

Esperado: sem erros. Se aparecer erro residual de `@base-ui/react` em algum arquivo, é um import esquecido — buscar com `grep -r "@base-ui" src/` e remover.

- [ ] **Step 5: Commit**

```bash
git add src/client/components/ui/toggle.tsx package.json package-lock.json
git commit -m "feat(ui): migrate Toggle from @base-ui/react to @radix-ui/react-switch"
```

---

## Task 4: Atualizar `CLAUDE.md` dos componentes UI

**Files:**
- Modify: `src/client/components/ui/CLAUDE.md`

- [ ] **Step 1: Substituir a seção de primitivos**

Localizar o parágrafo que começa com `**Primitivos base-ui:**` e substituir por:

```markdown
**Primitivos Radix UI:** para componentes com comportamento interativo que exigem acessibilidade (toggle, dialog, select, tooltip…), usar `@radix-ui/react-*` como primitivo e estilizar com Tailwind por cima. Não reinventar roda com `<div>` + handlers manuais.
```

- [ ] **Step 2: Adicionar seção sobre shadcn/ui ao final do arquivo**

Adicionar após o último parágrafo existente:

```markdown
## Adicionando novos componentes (shadcn/ui)

Para adicionar um componente do catálogo shadcn/ui:

1. **Gerar:** `npx shadcn@latest add <nome>` — o arquivo entra em `src/client/components/ui/`
2. **Substituir CVA por `tv()`:** trocar `cva()` + `VariantProps` de `class-variance-authority` por `tv()` + `VariantProps` de `tailwind-variants`
3. **Trocar tokens:** substituir cores hardcoded (`bg-white`, `text-zinc-900`) pelos tokens do design system (`bg-background`, `text-foreground`)
4. **Corrigir exports:** remover `"use client"`, trocar `export default` por named export, agrupar sub-componentes em objeto composto (`export const Dialog = { Root, Title, Content }`)

Se o componente gerado não usa `cva()`, manter `cn()` de `~/lib/utils` para merge de classes.

**`asChild` no Button:** use `<Button asChild><Link to="...">Texto</Link></Button>` para renderizar o botão como elemento filho sem perder variantes.
```

- [ ] **Step 3: Verificar tipagem**

```bash
npm run typecheck
```

Esperado: sem erros.

- [ ] **Step 4: Commit**

```bash
git add src/client/components/ui/CLAUDE.md
git commit -m "docs(ui): update CLAUDE.md for Radix UI primitives and shadcn workflow"
```

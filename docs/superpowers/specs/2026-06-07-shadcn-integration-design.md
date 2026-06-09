# Design: Integração shadcn/ui

**Data:** 2026-06-07  
**Status:** Aprovado

## Contexto

O projeto tem componentes UI construídos com Tailwind + `tailwind-variants`. O objetivo é adicionar uma biblioteca de componentes pré-construídos para acelerar o desenvolvimento (Dialog, Select, Tooltip, Combobox, Calendar, Alert, Badge, entre outros). O `@base-ui/react` está em uso em apenas um componente (`toggle.tsx`).

## Decisão

Adotar **shadcn/ui** como catálogo de receitas de componentes, com **Radix UI** como camada de primitivos acessíveis. O shadcn não é uma dependência de runtime — o CLI copia o código para o projeto, que é então adaptado às convenções existentes.

O `@base-ui/react` será removido após a migração do `toggle.tsx`.

## Arquitetura

A camada de primitivos passa de `@base-ui/react` para `@radix-ui/*`. A estrutura de `src/client/components/ui/` não muda — cada componente continua sendo um arquivo `.tsx` com named export, `tailwind-variants` e tokens do design system.

O shadcn será inicializado com:
- `style: "new-york"`
- `baseColor: "neutral"` (cores substituídas pelos tokens do projeto)
- `tailwind.config: false` (projeto usa Tailwind v4 sem config file)

## Componentes a adaptar

### Button — manter estilização atual, adicionar `asChild`

O `button.tsx` atual mantém toda a sua estilização e variantes (`tv()`). A única adição é o prop `asChild` via `@radix-ui/react-slot`, que permite renderizar o botão como outro elemento sem perder estilos:

```tsx
import { Slot } from "@radix-ui/react-slot";

type ButtonProps = ComponentProps<"button"> & ButtonVariants & {
  asChild?: boolean;
};

export function Button({ asChild, className, variant, size, rounded, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={button({ variant, size, rounded, className })} {...props} />;
}
```

### Toggle — migrar `@base-ui/react/switch` → `@radix-ui/react-switch`

O `toggle.tsx` migra do Switch do `@base-ui/react` para o `@radix-ui/react-switch`. A API é equivalente (`Root` + `Thumb`), com uma diferença de data attribute:

| base-ui | Radix |
|---|---|
| `data-[checked]` | `data-[state=checked]` |

A estilização visual permanece idêntica. Após a migração, `@base-ui/react` é removido do `package.json` e do `CLAUDE.md`.

## Processo para novos componentes shadcn

### 1. Gerar com o CLI

```bash
npx shadcn@latest add <nome>
```

O arquivo é gerado em `src/client/components/ui/<nome>.tsx`.

### 2. Adaptar — 4 transformações

| shadcn gera | projeto usa |
|---|---|
| `cva()` + `VariantProps` de `class-variance-authority` | `tv()` + `VariantProps` de `tailwind-variants` |
| `export default` | named export |
| `"use client"` no topo | remover |
| Cores hardcoded (`bg-white`, `text-zinc-900`) | tokens do design system (`bg-background`, `text-foreground`) |

### 3. Exportar como objeto composto

```tsx
// shadcn gera:
export { Dialog, DialogTitle, DialogContent }

// adaptar para:
export const Dialog = { Root, Title, Content }
```

### 4. Componentes sem variantes

Se o componente gerado não usa `cva()`, usar `twMerge` para merge de classes, conforme `CLAUDE.md`.

## Atualizações no CLAUDE.md

O `src/client/components/ui/CLAUDE.md` será atualizado:
- Substituir menção a `@base-ui/react` por Radix UI como primitivo para componentes interativos.
- Documentar o fluxo de 4 passos de adaptação de componentes shadcn.
- Documentar o prop `asChild` no Button.

## Fora de escopo

- Adicionar todos os componentes de uma vez — cada componente é adicionado conforme necessidade.
- Migrar estilos de rotas ou páginas existentes.
- Alterar o sistema de design (tokens, fontes, escala).

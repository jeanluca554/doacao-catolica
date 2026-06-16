# ToggleGroup UI Component — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar `src/client/components/ui/toggle-group.tsx` usando Radix UI como primitivo e substituir o `ToggleGroup` local de `createRecurrence` pelo componente reutilizável.

**Architecture:** `ToggleGroup.Root` envolve `ToggleGroupPrimitive.Root` do Radix com `type="single"` fixo e renderiza um `<input type="hidden">` para compatibilidade com forms nativos quando `name` é fornecido. `ToggleGroup.Item` envolve `ToggleGroupPrimitive.Item` estilizado via `tv()` usando os atributos `data-[state=on]`/`data-[state=off]` do Radix. O componente segue todos os padrões definidos em `src/client/components/ui/CLAUDE.md`.

**Tech Stack:** React 19, Radix UI (`radix-ui` umbrella package), tailwind-variants (`tv()`), Tailwind CSS v4, TypeScript.

---

## Mapa de arquivos

| Arquivo | Operação | Responsabilidade |
|---|---|---|
| `src/client/components/ui/toggle-group.tsx` | Criar | Componente reutilizável `ToggleGroup = { Root, Item }` |
| `src/client/pages/createRecurrence/index.tsx` | Modificar | Remove ToggleGroup local, usa o componente de ui/ |

---

### Task 1: Criar o componente ToggleGroup

**Files:**
- Create: `src/client/components/ui/toggle-group.tsx`

- [ ] **Step 1: Criar o arquivo com o conteúdo completo**

```tsx
// src/client/components/ui/toggle-group.tsx
import * as React from "react";
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui";
import { tv } from "tailwind-variants";
import { cn } from "~/lib/utils";

const toggleGroupItem = tv({
  base: [
    "h-9 rounded-md border px-4 text-sm font-medium transition-colors cursor-pointer",
    "data-[state=off]:border-(--border) data-[state=off]:bg-(--card) data-[state=off]:text-(--foreground) data-[state=off]:hover:bg-(--accent)",
    "data-[state=on]:border-(--primary) data-[state=on]:bg-(--primary) data-[state=on]:text-white",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
});

type RootProps = {
  name?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
};

function Root({ name, value, onValueChange, disabled, children, className }: RootProps) {
  return (
    <ToggleGroupPrimitive.Root
      type="single"
      value={value ?? ""}
      onValueChange={(v) => { if (v) onValueChange?.(v); }}
      disabled={disabled}
      className={cn("flex gap-2", className)}
    >
      {name && <input type="hidden" name={name} value={value ?? ""} />}
      {children}
    </ToggleGroupPrimitive.Root>
  );
}

type ItemProps = React.ComponentProps<typeof ToggleGroupPrimitive.Item>;

function Item({ className, ...props }: ItemProps) {
  return (
    <ToggleGroupPrimitive.Item
      className={toggleGroupItem({ className })}
      {...props}
    />
  );
}

export const ToggleGroup = { Root, Item };
```

> **Por que `if (v) onValueChange?.(v)`:** Radix chama `onValueChange("")` quando o usuário clica no item já selecionado (deselect). Como os campos de form sempre precisam ter um valor, ignoramos essa chamada para manter o estado consistente.
>
> **Por que `name` dentro do Root:** o `<input type="hidden">` é necessário para que o valor apareça no `FormData` do submit nativo. Radix não inclui esse mecanismo.

- [ ] **Step 2: Verificar TypeScript**

```bash
npm run typecheck
```

Esperado: sem erros.

- [ ] **Step 3: Commit**

```bash
git add src/client/components/ui/toggle-group.tsx
git commit -m "feat(ui): add ToggleGroup component using Radix UI primitive"
```

---

### Task 2: Atualizar createRecurrence para usar o componente de ui/

**Files:**
- Modify: `src/client/pages/createRecurrence/index.tsx`

- [ ] **Step 1: Adicionar import do ToggleGroup de ui/**

Localizar o bloco de imports de componentes UI (após os imports do react-router) e adicionar:

```tsx
import { ToggleGroup } from "~/client/components/ui/toggle-group";
```

- [ ] **Step 2: Remover a função ToggleGroup local**

Remover completamente o seguinte bloco (está entre `const CATEGORY_MAP` e `function SwitchField`):

```tsx
function ToggleGroup({
  name,
  options,
  value,
  onChange,
}: {
  name: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-2">
      <input type="hidden" name={name} value={value} />
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "h-9 rounded-md border px-4 text-sm font-medium transition-colors",
            value === opt.value
              ? "border-(--primary) bg-(--primary) text-white"
              : "border-(--border) bg-(--card) text-(--foreground) hover:bg-(--accent)",
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Atualizar uso de paymentType**

Substituir:

```tsx
<FormField name="paymentType" label="Forma de pagamento:" required>
  <ToggleGroup
    name="paymentType"
    value={paymentType}
    onChange={(v) => setPaymentType(v as "pix" | "bank_slip")}
    options={[
      { label: "Pix", value: "pix" },
      { label: "Boleto", value: "bank_slip" },
    ]}
  />
</FormField>
```

Por:

```tsx
<FormField name="paymentType" label="Forma de pagamento:" required>
  <ToggleGroup.Root name="paymentType" value={paymentType} onValueChange={(v) => setPaymentType(v as "pix" | "bank_slip")}>
    <ToggleGroup.Item value="pix">Pix</ToggleGroup.Item>
    <ToggleGroup.Item value="bank_slip">Boleto</ToggleGroup.Item>
  </ToggleGroup.Root>
</FormField>
```

- [ ] **Step 4: Atualizar uso de valueType**

Substituir:

```tsx
<FormField name="valueType" label="Tipo de valor:" required>
  <ToggleGroup
    name="valueType"
    value={valueType}
    onChange={(v) => setValueType(v as "fixed" | "undetermined")}
    options={[
      { label: "Valor fixo", value: "fixed" },
      { label: "Valor indeterminado", value: "undetermined" },
    ]}
  />
</FormField>
```

Por:

```tsx
<FormField name="valueType" label="Tipo de valor:" required>
  <ToggleGroup.Root name="valueType" value={valueType} onValueChange={(v) => setValueType(v as "fixed" | "undetermined")}>
    <ToggleGroup.Item value="fixed">Valor fixo</ToggleGroup.Item>
    <ToggleGroup.Item value="undetermined">Valor indeterminado</ToggleGroup.Item>
  </ToggleGroup.Root>
</FormField>
```

- [ ] **Step 5: Verificar TypeScript**

```bash
npm run typecheck
```

Esperado: sem erros. O `cn` continua sendo usado no `<textarea>` então seu import não precisa ser removido.

- [ ] **Step 6: Commit**

```bash
git add src/client/pages/createRecurrence/index.tsx
git commit -m "refactor(createRecurrence): replace local ToggleGroup with ui/ component"
```

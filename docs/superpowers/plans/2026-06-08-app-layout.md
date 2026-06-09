# appLayout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Criar o layout `appLayout` com o header do Figma Sancton (logo + botões de ação + avatar), sem loader, para envolver futuras rotas da aplicação principal.

**Architecture:** Dois arquivos de layout seguindo a convenção do projeto — adapter de rota mínimo em `src/main/routes/` e componente visual em `src/client/layouts/`. O Header é um componente interno do layout, estilizado com Tailwind v4 + `tailwind-variants` (`tv()` com slots). Logo como asset SVG placeholder.

**Tech Stack:** React Router v7 SSR, React 19, Tailwind CSS v4, tailwind-variants, lucide-react

---

## Mapa de arquivos

| Arquivo | Ação | Responsabilidade |
|---|---|---|
| `src/client/assets/sancton-logo.svg` | Criar | Logo placeholder (SVG simples) |
| `src/client/layouts/appLayout/components/header/index.tsx` | Criar | Header visual fiel ao Figma |
| `src/client/layouts/appLayout/index.tsx` | Criar | AppLayout: Header + Outlet |
| `src/main/routes/layout.appLayout.tsx` | Criar | Adapter de rota (sem loader) |

---

## Task 1: Logo SVG placeholder

**Files:**
- Create: `src/client/assets/sancton-logo.svg`

- [ ] **Step 1: Criar o SVG placeholder**

Crie o arquivo com o conteúdo abaixo. É um SVG simples com o texto "sancton" e uma marca circular, que será substituído pelo SVG real exportado do Figma depois.

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="120" height="32" viewBox="0 0 120 32" fill="none">
  <circle cx="6" cy="16" r="6" fill="#2563EB"/>
  <text x="18" y="21" font-family="system-ui, sans-serif" font-size="16" font-weight="700" letter-spacing="-0.5" fill="#2563EB">sancton</text>
</svg>
```

- [ ] **Step 2: Verificar tipagem**

```bash
cd /var/www/testes/donation-react-router-v7 && npm run typecheck 2>&1 | tail -5
```

Resultado esperado: nenhum erro relacionado ao SVG (o typecheck pode ignorar assets — ok se passar limpo).

- [ ] **Step 3: Commit**

```bash
git add src/client/assets/sancton-logo.svg
git commit -m "feat: add sancton logo SVG placeholder"
```

---

## Task 2: Header component

**Files:**
- Create: `src/client/layouts/appLayout/components/header/index.tsx`

- [ ] **Step 1: Criar o diretório e o arquivo**

```bash
mkdir -p src/client/layouts/appLayout/components/header
```

- [ ] **Step 2: Implementar o Header**

Crie `src/client/layouts/appLayout/components/header/index.tsx`:

```tsx
import {
  Bell,
  ChevronDown,
  LayoutGrid,
  LifeBuoy,
  Settings,
} from "lucide-react";
import { tv } from "tailwind-variants";
import sanctonLogo from "~/client/assets/sancton-logo.svg";

const header = tv({
  slots: {
    root: [
      "flex items-center justify-between",
      "border-b border-(--border) bg-(--card)",
      "px-8 py-3",
    ],
    leftContent: "flex w-64 shrink-0 items-center gap-6 pr-4",
    separator: "h-5 w-px flex-1 bg-(--border)",
    rightContent: "flex shrink-0 items-center gap-4",
    buttonGroup: "flex h-8 items-center gap-4",
    iconButton: [
      "relative flex size-8 shrink-0 items-center justify-center",
      "rounded-full bg-(--card-foreground-secondary)",
    ],
    notificationBadge: [
      "absolute right-0 top-0 size-2 rounded-full",
      "bg-[rgb(var(--spotlight-danger))] ring-2 ring-(--card)",
    ],
    userSection: "flex items-center gap-2",
    avatar: [
      "size-11 shrink-0 rounded-full",
      "bg-gradient-to-br from-indigo-400 to-violet-500",
    ],
  },
});

const {
  root,
  leftContent,
  separator,
  rightContent,
  buttonGroup,
  iconButton,
  notificationBadge,
  userSection,
  avatar,
} = header();

function Header() {
  return (
    <header className={root()}>
      <div className={leftContent()}>
        <img src={sanctonLogo} alt="Sancton" className="h-8 w-auto" />
        <span className={separator()} />
      </div>

      <div className={rightContent()}>
        <div className={buttonGroup()}>
          <button
            type="button"
            aria-label="Notificações"
            className={iconButton()}
          >
            <Bell size={20} />
            <span className={notificationBadge()} />
          </button>

          <button
            type="button"
            aria-label="Ajuda"
            className={iconButton()}
          >
            <LifeBuoy size={20} />
          </button>

          <button
            type="button"
            aria-label="Apps"
            className={iconButton()}
          >
            <LayoutGrid size={20} />
          </button>
        </div>

        <button
          type="button"
          aria-label="Configurações"
          className={iconButton()}
        >
          <Settings size={20} />
        </button>

        <div className={userSection()}>
          <div className={avatar()} />
          <ChevronDown size={16} className="text-(--text-muted)" />
        </div>
      </div>
    </header>
  );
}

export { Header };
```

- [ ] **Step 3: Verificar tipagem**

```bash
npm run typecheck 2>&1 | grep -E "error|warning" | head -20
```

Resultado esperado: nenhum erro TypeScript novo.

- [ ] **Step 4: Commit**

```bash
git add src/client/layouts/appLayout/components/header/index.tsx
git commit -m "feat: add appLayout Header component"
```

---

## Task 3: AppLayout index

**Files:**
- Create: `src/client/layouts/appLayout/index.tsx`

- [ ] **Step 1: Implementar o AppLayout**

Crie `src/client/layouts/appLayout/index.tsx`:

```tsx
import { Outlet } from "react-router";
import { Header } from "./components/header";

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export { AppLayout };
```

- [ ] **Step 2: Verificar tipagem**

```bash
npm run typecheck 2>&1 | grep -E "error|warning" | head -20
```

Resultado esperado: nenhum erro TypeScript novo.

- [ ] **Step 3: Commit**

```bash
git add src/client/layouts/appLayout/index.tsx
git commit -m "feat: add AppLayout with Header and Outlet"
```

---

## Task 4: Route adapter

**Files:**
- Create: `src/main/routes/layout.appLayout.tsx`

- [ ] **Step 1: Implementar o adapter**

Crie `src/main/routes/layout.appLayout.tsx`:

```tsx
import { AppLayout } from "~/client/layouts/appLayout";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";

export function ErrorBoundary() {
  return <ErrorBoundaryPage />;
}

export default AppLayout;
```

- [ ] **Step 2: Verificar tipagem completa**

```bash
npm run typecheck 2>&1 | grep -E "error|warning" | head -20
```

Resultado esperado: nenhum erro TypeScript.

- [ ] **Step 3: Verificar no dev server**

```bash
npm run dev
```

Registre temporariamente o layout em `src/routes.ts` para testar visualmente (reverter depois se as rotas filhas ainda não existem):

```ts
// Adicionar temporariamente em src/routes.ts para testar:
import { layout } from "@react-router/dev/routes";

// Dentro do array default:
layout("./main/routes/layout.appLayout.tsx", [
  // rota de teste — pode usar uma existente ou criar uma mínima
]),
```

Verifique no browser que o header aparece com logo, ícones e avatar.

- [ ] **Step 4: Reverter registro temporário (se aplicável)**

Se adicionou rotas temporárias em `src/routes.ts` apenas para teste, remova antes do commit.

- [ ] **Step 5: Commit**

```bash
git add src/main/routes/layout.appLayout.tsx
git commit -m "feat: add appLayout route adapter"
```

---

## Fora do escopo

- Interatividade dos botões (dropdown de notificações, painel de ajuda, etc.)
- Dropdown do avatar (menu de perfil / logout)
- Loader com dados reais do usuário autenticado
- Definição definitiva das rotas filhas em `src/routes.ts`
- Exportar o SVG real do Figma (substituir o placeholder)

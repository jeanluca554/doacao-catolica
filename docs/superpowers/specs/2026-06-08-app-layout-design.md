# appLayout — Design Spec

**Data:** 2026-06-08  
**Status:** Aprovado

## Contexto

O design system Sancton (Figma: `Uj9VSO1P2ZjUQ1WxMfiyVG`, node `776:19721`) tem um componente header pronto. O objetivo é transformá-lo em um layout React Router v7 reutilizável para as rotas da aplicação principal que ainda serão criadas.

## Decisões

| Decisão | Escolha | Motivo |
|---|---|---|
| Estrutura | Header + conteúdo direto (sem sidebar) | Layout limpo para novas rotas |
| Logo | Asset SVG externo | Consistente com padrão do projeto (`workspaceLayout` usa a mesma abordagem) |
| Dados | Estático / decorativo | Sem loader por enquanto — interatividade futura |
| Styling | Tailwind CSS v4 + `tailwind-variants` | Padrão definido no CLAUDE.md para componentes novos |
| Nome | `appLayout` | Genérico o suficiente para múltiplas rotas da app principal |

## Arquivos a criar

```
src/
├── main/routes/
│   └── layout.appLayout.tsx          ← adapter de rota
├── client/
│   ├── assets/
│   │   └── sancton-logo.svg          ← exportado manualmente do Figma
│   └── layouts/appLayout/
│       ├── index.tsx                 ← AppLayout com <Outlet />
│       └── components/header/
│           └── index.tsx             ← Header visual fiel ao Figma
```

## Especificação por arquivo

### `src/main/routes/layout.appLayout.tsx`

Adapter de rota mínimo, seguindo o padrão do projeto:

```tsx
import { AppLayout } from "~/client/layouts/appLayout";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";

export function ErrorBoundary() {
  return <ErrorBoundaryPage />;
}

export default AppLayout;
```

Sem `loader` — o layout é estático por enquanto.

### `src/client/layouts/appLayout/index.tsx`

Estrutura visual com `<Outlet />`:

```tsx
import { Outlet } from "react-router";
import { Header } from "./components/header";

function AppLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

export { AppLayout };
```

### `src/client/layouts/appLayout/components/header/index.tsx`

Header fiel ao Figma. Estrutura:

- **Container:** `flex items-center justify-between`, altura ~64px, `bg-card border-b`
- **Left content** (`w-64`, gap 24px):
  - Logo Sancton via `<img src={logo} />` (asset SVG)
  - Separador vertical (`w-px h-5 bg-border`)
- **Right content** (gap 16px, alinhado à direita):
  - Grupo de 3 botões circulares 32×32 (`bg-card-foreground-secondary rounded-full`):
    - Notificação (ícone bell + badge vermelho no canto)
    - Ajuda (ícone life-buoy)
    - Apps (ícone layout-grid)
  - Botão configurações 32×32 (ícone settings)
  - Avatar do usuário 44×44 (imagem circular) + chevron-down

Styling via `tv()` do `tailwind-variants`. Ícones via `lucide-react` (já utilizado no Figma: `lucide/bell`, `lucide/life-buoy`, `lucide/layout-grid`).

O badge de notificação é um `<span>` absolutamente posicionado (`absolute top-0 right-0 size-2 rounded-full bg-red-500`).

Avatar usa placeholder via CSS (gradiente ou cor sólida) enquanto não há dados reais.

### `src/client/assets/sancton-logo.svg`

Logo exportado manualmente do Figma antes da implementação. Deve incluir o logotipo completo "sancton" (texto + marca). Importado como:

```tsx
import sanctonLogo from "~/client/assets/sancton-logo.svg";
```

## Fora do escopo

- Interatividade dos botões (dropdown de notificações, painel de ajuda, etc.)
- Dropdown do avatar (menu de perfil / logout)
- Loader com dados reais do usuário autenticado
- Definição das rotas filhas em `src/routes.ts`

## Integração com routes.ts

Quando as rotas filhas forem criadas, o layout deve ser registrado assim:

```ts
route("alguma-rota", "./main/routes/layout.appLayout.tsx", [
  route("sub-rota", "./main/routes/route.exemplo.tsx"),
]),
```

## Dependências

- `lucide-react` — ícones (bell, life-buoy, layout-grid, settings, chevron-down)
- `tailwind-variants` — já instalado
- Tailwind CSS v4 — já configurado
- `sancton-logo.svg` — precisa ser exportado do Figma antes de implementar

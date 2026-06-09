# donation-react-router-v7

## Stack
React Router v7 (SSR) · React 19 · Tailwind CSS v4 · tailwind-variants · shadcn/ui · Radix UI

## Estrutura de diretórios

```
src/
├── main/routes/        # rotas: _index.ts, route.*.tsx, layout.*.tsx, api.*.ts
├── client/
│   ├── components/ui/  # componentes genéricos reutilizáveis (ver CLAUDE.md local)
│   ├── components/     # componentes de aplicação não ligados a uma rota
│   ├── layouts/        # layouts visuais com <Outlet /> → <nome>Layout/index.tsx
│   ├── pages/          # componentes de página sem lógica de rota
│   └── hooks/          # hooks reutilizáveis
├── lib/                # utilitários — utils.ts, *.server.ts (só roda no servidor)
├── app/                # casos de uso e lógica de domínio
├── domain/             # entidades, gateways, protocolos
└── infra/              # adaptadores, controllers, DAL, serviços
```

## Convenção de nomes em `src/main/routes/`

| Tipo | Arquivo |
|------|---------|
| Index | `_index.ts` |
| Página | `route.<nome>.tsx` |
| Layout adapter | `layout.<nome>Layout.tsx` |
| API | `api.<nome>.ts` |

## Layouts (dois arquivos separados)

**`src/main/routes/layout.<nome>Layout.tsx`** — thin adapter, sem JSX:
```tsx
export async function loader(args: Route.LoaderArgs) { ... }
export function ErrorBoundary() { return <ErrorBoundaryPage />; }
export default <Nome>Layout;
```

**`src/client/layouts/<nome>Layout/index.tsx`** — estrutura visual com `<Outlet />`:
```tsx
export function <Nome>Layout() {
  return <><Header /><Outlet /></>;
}
```

## Tailwind: escala numérica vs. arbitrário

Tailwind v4 gera utilitários sob demanda (N × 4px). Preferir escala sobre `[Xpx]`:
- `max-w-240` (960px), `h-90` (360px), `w-15` (60px), `translate-x-4.5` (18px)
- Exceção: font sizes sem equivalente na escala → `text-[13px]` permitido

## Componentes UI

Padrão de composição — sub-componentes via objeto exportado:
```tsx
export const Card = { Root, Title, Description };
// uso: <Card.Root><Card.Title>…</Card.Title></Card.Root>
```

Ver `src/client/components/ui/CLAUDE.md` para todas as regras de implementação.

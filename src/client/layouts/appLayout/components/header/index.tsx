import {
  Bell,
  ChevronDown,
  LayoutGrid,
  LifeBuoy,
  Settings,
} from "lucide-react";
import { useRoot } from "~/client/hooks/useRoot";

function Header() {
  const { LIGHT_LOGO } = useRoot().environmentVariables;

  return (
    <header className="flex h-16 items-center justify-between border-b border-(--border) bg-(--card) px-8">
      <div className="flex w-64 shrink-0 items-center gap-6 pr-4">
        <img src={LIGHT_LOGO} alt="Sancton" className="h-8 w-auto shrink-0" />
        <span className="h-5 flex-1 min-w-px" aria-hidden="true" />
        {/* <button type="button" aria-label="Menu" className="relative shrink-0">
          <Menu size={20} />
        </button> */}
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <div className="flex h-8 items-center gap-4">
          <button
            type="button"
            aria-label="Notificações"
            className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-(--card-foreground-secondary)"
          >
            <Bell size={20} />
            <span className="absolute left-6 top-0 size-2 rounded-full bg-[rgb(var(--spotlight-danger))] ring-2 ring-(--card)" />
          </button>

          <button
            type="button"
            aria-label="Ajuda"
            className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-(--card-foreground-secondary)"
          >
            <LifeBuoy size={20} />
          </button>

          <button
            type="button"
            aria-label="Apps"
            className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-(--card-foreground-secondary)"
          >
            <LayoutGrid size={20} />
          </button>
        </div>

        <button
          type="button"
          aria-label="Configurações"
          className="relative flex size-8 shrink-0 items-center justify-center rounded-full bg-(--card-foreground-secondary)"
        >
          <Settings size={20} />
        </button>

        <div className="flex items-center gap-2">
          <div className="size-11 shrink-0 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500" />
          <ChevronDown size={16} className="text-(--text-muted)" />
        </div>
      </div>
    </header>
  );
}

export { Header };

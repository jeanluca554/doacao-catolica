import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "~/client/components/ui/button";

function Header() {
  const navigate = useNavigate();

  return (
    <header className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-2xl font-semibold text-(--text-heading)">
        Minhas campanhas
      </h1>

      <Button
        className="w-full sm:w-auto"
        data-icon="inline-start"
        onClick={() => navigate("create")}
      >
        <Plus className="h-4 w-4" />
        Adicionar
      </Button>
    </header>
  );
}

export { Header };

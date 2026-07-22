import { CalendarDays } from "lucide-react";
import { Link } from "react-router";
import { Button } from "~/client/components/ui/button";
import { useRoot } from "~/client/hooks/useRoot";

function EmptyPendingInvites() {
  const { environmentVariables, user } = useRoot();

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center px-6 py-10">
      <div className="grid w-full max-w-280 items-center gap-12 min-[970px]:grid-cols-2">
        <div className="flex max-w-xl flex-col items-start gap-6">
          <img
            src={environmentVariables.LIGHT_LOGO}
            alt={environmentVariables.PLATAFORM_NAME}
            className="h-10 w-auto"
          />

          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-semibold text-(--text-heading)">
              Olá, {user?.name ?? ""}!
            </h1>
            <p className="text-xl font-medium text-foreground">
              Você não possui nenhum pedido de colaboração.
            </p>
            <p className="max-w-lg text-sm leading-6 text-muted-foreground">
              Todos os pedidos de colaboração em campanhas já foram aceitos,
              então clique no botão abaixo para acessar uma delas!
            </p>
          </div>

          <Button asChild>
            <Link to="/my-campaigns">
              <CalendarDays size={16} />
              Ver todas as campanhas
            </Link>
          </Button>
        </div>

        <img
          src="/welcome-image.png"
          alt="Voluntários organizando doações"
          className="hidden aspect-4/3 w-full rounded-lg object-cover min-[970px]:block"
        />
      </div>
    </div>
  );
}

export { EmptyPendingInvites };

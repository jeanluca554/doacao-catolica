import { ArrowLeft } from "lucide-react";
import { useLoaderData, useNavigate } from "react-router";
import { Button } from "~/client/components/ui/button";
import type { BirthdayCelebrantsLoader } from "~/client/types/birthdayCelebrantsLoader";
import { BirthdayCelebrantsTable } from "./components/birthdayCelebrantsTable";
import { BirthdayFilters } from "./components/birthdayFilters";

function BirthdayReportPage() {
  const { birthdayCelebrants } =
    useLoaderData<BirthdayCelebrantsLoader>();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-(--text-heading)">
            Relatório de Aniversariantes
          </h1>
          <p className="text-sm text-muted-foreground">Relatórios</p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("../reports")}
        >
          <ArrowLeft size={16} />
          Voltar para relatórios
        </Button>
      </div>

      <BirthdayFilters />
      <BirthdayCelebrantsTable
        birthdayCelebrants={birthdayCelebrants}
      />
    </div>
  );
}

export { BirthdayReportPage };

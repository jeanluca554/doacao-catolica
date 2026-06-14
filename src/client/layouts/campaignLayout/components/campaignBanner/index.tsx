import { ArrowLeft, Eye } from "lucide-react";
import { Link, useLoaderData } from "react-router";
import { Badge } from "~/client/components/ui/badge";
import { Button } from "~/client/components/ui/button";
import { SidebarTrigger } from "~/client/components/ui/sidebar";
import type { CampaignLayoutLoader } from "~/client/types/campaignLayoutLoader";
import { formatCurrency } from "~/lib/formatCurrency";

function CampaignBanner() {
  const { campaign } = useLoaderData<CampaignLayoutLoader>();

  return (
    <header className="sticky top-0 z-30 flex min-h-14 w-full items-center justify-between gap-3 border-b border-(--border) bg-(--card) px-4 py-2 sm:px-7">
      <div className="flex min-w-0 items-center gap-2">
        <SidebarTrigger className="shrink-0 md:hidden" />
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="truncate text-xl font-semibold leading-6 text-(--text-heading)">
            {campaign.name}
          </p>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-sm">
            <Badge
              variant={campaign.status ? "success" : "danger"}
              className="pb-0.75"
            >
              {campaign.status ? "Ativo" : "Inativo"}
            </Badge>
            <span className="hidden text-(--border) sm:inline">•</span>
            <span className="text-(--text-muted)">
              {"Arrecadado: "}
              <span className="font-semibold text-[rgb(var(--spotlight-primary))]">
                {formatCurrency(campaign.currentRevenue)}
              </span>
              <span className="hidden sm:inline">{` de ${formatCurrency(campaign.totalGoal)}`}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="outline"
          className="h-10 min-h-0 w-auto gap-1.5 rounded-md px-3.5 text-sm"
          asChild
        >
          <Link to="/my-campaigns">
            <ArrowLeft size={15} />
            <span className="hidden sm:inline">Voltar para campanhas</span>
          </Link>
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="size-10 rounded-lg text-[rgb(var(--spotlight-primary))]"
        >
          <Eye size={16} />
        </Button>
      </div>
    </header>
  );
}

export { CampaignBanner };

import { Plus } from "lucide-react";
import { Button } from "~/client/components/ui/button";

type CampaignGroupsHeaderProps = {
  onAdd: () => void;
};

function CampaignGroupsHeader({ onAdd }: CampaignGroupsHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-2xl font-semibold text-(--text-heading)">
        Grupos de campanhas
      </h1>
      <Button variant="ghost" onClick={onAdd}>
        <Plus size={16} />
        Adicionar
      </Button>
    </div>
  );
}

export { CampaignGroupsHeader };

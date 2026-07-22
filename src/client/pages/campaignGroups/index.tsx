import { useState } from "react";
import { useLoaderData } from "react-router";
import type { CampaignGroupsLoader } from "~/client/types/campaignGroupsLoader";
import { CampaignGroupsTable } from "./components/campaignGroupsTable";
import { CreateCampaignGroupModal } from "./components/createCampaignGroupModal";
import { DeleteCampaignGroupModal } from "./components/deleteCampaignGroupModal";
import { CampaignGroupsHeader } from "./components/header";
import type { CampaignGroupModel } from "./components/types";
import { UpdateCampaignGroupModal } from "./components/updateCampaignGroupModal";

function CampaignGroupsPage() {
  const { campaignGroups } = useLoaderData<CampaignGroupsLoader>();
  const [createOpen, setCreateOpen] = useState(false);
  const [updateTarget, setUpdateTarget] = useState<CampaignGroupModel | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<CampaignGroupModel | null>(
    null,
  );

  return (
    <div className="flex w-full flex-col gap-6 p-6 sm:p-8">
      <CampaignGroupsHeader onAdd={() => setCreateOpen(true)} />
      <CampaignGroupsTable
        campaignGroups={campaignGroups.data}
        meta={campaignGroups.meta}
        onEdit={setUpdateTarget}
        onDelete={setDeleteTarget}
      />

      <CreateCampaignGroupModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
      />
      <UpdateCampaignGroupModal
        campaignGroup={updateTarget}
        onClose={() => setUpdateTarget(null)}
      />
      <DeleteCampaignGroupModal
        campaignGroup={deleteTarget}
        onClose={() => setDeleteTarget(null)}
      />
    </div>
  );
}

export { CampaignGroupsPage };

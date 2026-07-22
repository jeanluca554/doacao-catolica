import { useEffect } from "react";
import { useFetcher } from "react-router";
import { Button } from "~/client/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/client/components/ui/dialog";
import { Separator } from "~/client/components/ui/separator";
import { TrashDashedBorderCircle } from "~/client/components/ui/trash-dashed-border-circle";
import { useActionToast } from "~/client/hooks/useActionToast";
import type { CampaignGroupModel } from "./types";

type DeleteCampaignGroupModalProps = {
  campaignGroup: CampaignGroupModel | null;
  onClose: () => void;
};

function DeleteCampaignGroupModal({
  campaignGroup,
  onClose,
}: DeleteCampaignGroupModalProps) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  useActionToast(fetcher.data);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.toast) onClose();
  }, [fetcher.state, fetcher.data]);

  return (
    <Dialog
      open={!!campaignGroup}
      onOpenChange={(nextOpen) => !nextOpen && onClose()}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deletar grupo de campanha</DialogTitle>
        </DialogHeader>

        <fetcher.Form method="post" className="flex flex-col gap-4">
          <input type="hidden" name="_action" value="deleteCampaignGroup" />
          <input type="hidden" name="id" value={campaignGroup?.id ?? ""} />

          <TrashDashedBorderCircle />
          <DialogDescription className="px-6 text-center">
            Deseja remover esse grupo de campanha?
          </DialogDescription>

          <Separator />
          <DialogFooter showCloseButton>
            <Button type="submit" variant="danger" isLoading={isSubmitting}>
              Remover
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}

export { DeleteCampaignGroupModal };

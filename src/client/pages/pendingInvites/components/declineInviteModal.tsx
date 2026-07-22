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
import { useActionToast } from "~/client/hooks/useActionToast";
import type { PendingInvite } from "./types";

type DeclineInviteModalProps = {
  invite: PendingInvite | null;
  onClose: () => void;
};

type DeclineActionData = {
  closeModalKey?: string;
  toast?: {
    title?: string;
    message: string;
    type: "success" | "error";
  };
};

const DECLINE_MODAL_KEY = "decline-invite-modal";

function DeclineInviteModal({ invite, onClose }: DeclineInviteModalProps) {
  const fetcher = useFetcher<DeclineActionData>();
  const isSubmitting = fetcher.state !== "idle";

  useActionToast(fetcher.data);

  useEffect(() => {
    if (
      fetcher.state === "idle" &&
      fetcher.data?.closeModalKey === DECLINE_MODAL_KEY
    ) {
      onClose();
    }
  }, [fetcher.data, fetcher.state, onClose]);

  return (
    <Dialog open={!!invite} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <fetcher.Form method="post" className="flex flex-col gap-4">
          <input type="hidden" name="_action" value="declineInvitation" />
          <input type="hidden" name="id" value={invite?.id ?? ""} />

          <DialogHeader>
            <DialogTitle>Recusar convite</DialogTitle>
            <DialogDescription className="leading-6">
              Deseja recusar este convite?
              <br />
              O convite para {invite?.projectName} será recusado.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter showCloseButton>
            <Button
              type="submit"
              variant="danger"
              isLoading={isSubmitting}
              disabled={!invite}
            >
              Recusar convite
            </Button>
          </DialogFooter>
        </fetcher.Form>
      </DialogContent>
    </Dialog>
  );
}

export { DeclineInviteModal };

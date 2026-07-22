import { useEffect } from "react";
import { useFetcher } from "react-router";
import { Button } from "~/client/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/client/components/ui/dialog";
import { FormErrorProvider, FormField } from "~/client/components/ui/form-field";
import { Input } from "~/client/components/ui/input";
import { Separator } from "~/client/components/ui/separator";
import { Textarea } from "~/client/components/ui/textarea";
import { useActionToast } from "~/client/hooks/useActionToast";

type CreateCampaignGroupModalProps = {
  open: boolean;
  onClose: () => void;
};

function CreateCampaignGroupModal({
  open,
  onClose,
}: CreateCampaignGroupModalProps) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state !== "idle";

  useActionToast(fetcher.data);

  useEffect(() => {
    if (fetcher.state === "idle" && fetcher.data?.toast) onClose();
  }, [fetcher.state, fetcher.data]);

  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar novo grupo de campanha</DialogTitle>
        </DialogHeader>

        <FormErrorProvider fieldErrors={fetcher.data?.cause?.fieldErrors}>
          <fetcher.Form method="post" className="flex flex-col gap-4">
            <input type="hidden" name="_action" value="createCampaignGroup" />

            <div className="flex flex-col gap-4 px-6">
              <FormField name="name" label="Nome" required>
                <Input name="name" autoFocus />
              </FormField>
              <FormField name="description" label="Descrição" required>
                <Textarea name="description" className="min-h-24" />
              </FormField>
            </div>

            <Separator />
            <DialogFooter showCloseButton>
              <Button type="submit" isLoading={isSubmitting}>
                Adicionar
              </Button>
            </DialogFooter>
          </fetcher.Form>
        </FormErrorProvider>
      </DialogContent>
    </Dialog>
  );
}

export { CreateCampaignGroupModal };

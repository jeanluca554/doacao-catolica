import { useEffect, useRef } from "react";
import { useFetcher } from "react-router";
import { Button } from "~/client/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/client/components/ui/dialog";
import {
  FormErrorProvider,
  FormField,
} from "~/client/components/ui/form-field";
import { Input } from "~/client/components/ui/input";
import { Separator } from "~/client/components/ui/separator";
import { useActionToast } from "~/client/hooks/useActionToast";

type GenerateBookletDialogProps = {
  subscriptionUuid: string | null;
  onClose: () => void;
};

function GenerateBookletDialog({
  subscriptionUuid,
  onClose,
}: GenerateBookletDialogProps) {
  const fetcher = useFetcher();
  useActionToast(fetcher.data);
  const isSubmitting = fetcher.state !== "idle";
  const lastOpenedUrlRef = useRef<string | null>(null);

  useEffect(() => {
    const url = fetcher.data?.urlResponse;
    if (!url || lastOpenedUrlRef.current === url) return;
    lastOpenedUrlRef.current = url;
    window.open(url, "_blank");
    onClose();
  }, [fetcher.data?.urlResponse, onClose]);

  return (
    <Dialog open={!!subscriptionUuid} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Gerar carnê</DialogTitle>
        </DialogHeader>
        <FormErrorProvider fieldErrors={fetcher.data?.cause?.fieldErrors}>
          <fetcher.Form method="post" className="flex flex-col gap-4">
            <input
              type="hidden"
              name="subscriptionUuid"
              value={subscriptionUuid ?? ""}
            />
            <div className="flex flex-col gap-4 px-6">
              <FormField name="startDate" label="Data de início:" required>
                <Input name="startDate" type="date" />
              </FormField>
              <FormField name="endDate" label="Data de término:" required>
                <Input name="endDate" type="date" />
              </FormField>
            </div>
            <Separator />
            <DialogFooter showCloseButton>
              <Button
                type="submit"
                name="_action"
                value="generatePaymentBooklet"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Gerando..." : "Gerar carnê"}
              </Button>
            </DialogFooter>
          </fetcher.Form>
        </FormErrorProvider>
      </DialogContent>
    </Dialog>
  );
}

export { GenerateBookletDialog };

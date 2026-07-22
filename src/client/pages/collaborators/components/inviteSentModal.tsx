import { MailCheck } from "lucide-react";
import { Button } from "~/client/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/client/components/ui/dialog";

type InviteSentModalProps = {
  open: boolean;
  email: string;
  onConfirm: () => void;
};

function InviteSentModal({ open, email, onConfirm }: InviteSentModalProps) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onConfirm()}>
      <DialogContent className="gap-0 p-0 sm:max-w-116">
        <DialogHeader className="border-b border-border px-6 py-5">
          <DialogTitle className="text-base">Convite enviado!</DialogTitle>
        </DialogHeader>

        <DialogDescription asChild>
          <div className="flex flex-col items-center gap-8 px-8 py-7 text-center text-base leading-6 text-foreground">
            <MailCheck size={56} strokeWidth={1.5} className="text-primary" />

            <p className="leading-4">
              O convite de colaborador foi enviado com sucesso e está com status{" "}
              <strong>“Pendente”</strong>.
            </p>

            <p className="leading-4">
              Peça ao usuário convidado para fazer login (ou criar uma nova
              conta) com o email <strong>{email}</strong> nesse painel,
              escolhendo o perfil de "Organizador", e aceitar o convite que
              aparecerá na tela após acessar o sistema.
            </p>
          </div>
        </DialogDescription>

        <DialogFooter className="border-t border-border px-4 py-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={onConfirm}
          >
            Ok, entendi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { InviteSentModal };

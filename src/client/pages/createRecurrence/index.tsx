import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import {
  Link,
  useLoaderData,
  useLocation,
  useNavigate,
  useParams,
  useFetcher,
} from "react-router";
import {
  FormErrorProvider,
  FormField,
} from "~/client/components/ui/form-field";
import { Button } from "~/client/components/ui/button";
import { Card } from "~/client/components/ui/card";
import { Combobox } from "~/client/components/ui/combobox";
import { Input } from "~/client/components/ui/input";
import { Label } from "~/client/components/ui/label";
import { Switch } from "~/client/components/ui/switch";
import { ToggleGroup } from "~/client/components/ui/toggle-group";
import type { CreateRecurrenceLoader } from "~/client/types/createRecurrenceLoader";
import { cn } from "~/lib/utils";
import { useFilter } from "~/client/hooks/useFilter";
import { ContactDetailCard } from "./components/ContactDetailCard";

const CATEGORY_MAP: Record<number, "donation" | "tithe"> = {
  1: "donation",
  2: "tithe",
};

function SwitchField({
  name,
  label,
  checked,
  onChange,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <input type="hidden" name={name} value={checked ? "true" : "false"} />
      <Label className="cursor-pointer" onClick={() => onChange(!checked)}>
        {label}
      </Label>
      <Switch checked={checked} onCheckedChange={onChange} />
    </div>
  );
}

function CreateRecurrencePage() {
  const { contacts, campaign, contactDetail } =
    useLoaderData<CreateRecurrenceLoader>();
  const { campaignId } = useParams<{ campaignId: string }>();
  const { Form, state, data } = useFetcher();
  const navigate = useNavigate();
  const location = useLocation();
  const isSubmitting = state === "submitting";

  const [selectedContactId, setSelectedContactId] = useState(
    contactDetail?.contactId ?? "",
  );
  const [paymentType, setPaymentType] = useState<"pix" | "bank_slip">("pix");
  const [valueType, setValueType] = useState<"fixed" | "undetermined">(
    "fixed",
  );
  const [currentMonthPayment, setCurrentMonthPayment] = useState<
    "sim" | "não"
  >("sim");
  const [activeNotification, setActiveNotification] = useState(true);

  const category = CATEGORY_MAP[campaign.type] ?? "donation";

  const contactOptions = contacts.map((c) => ({
    value: c.id,
    label: c.name,
  }));

  const { handleChangeFilter } = useFilter("contacts");

  function handleContactChange(contactId: string) {
    setSelectedContactId(contactId);
    const params = new URLSearchParams(location.search);
    if (contactId) {
      params.set("contactPublicId", contactId);
    } else {
      params.delete("contactPublicId");
    }
    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          to={`/campaign/${campaignId}/payment-statements`}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-(--border) hover:bg-(--accent)"
        >
          <ArrowLeft size={16} />
        </Link>
        <h1 className="text-xl font-semibold text-(--text-heading)">
          Adicionar recorrência
        </h1>
      </div>

      <FormErrorProvider fieldErrors={data?.cause?.fieldErrors}>
        <Form method="post" className="space-y-6">
          <input type="hidden" name="accountId" value={campaign.accountId} />
          <input type="hidden" name="category" value={category} />
          <input
            type="hidden"
            name="contactId"
            value={contactDetail?.contactId ?? ""}
          />
          <input
            type="hidden"
            name="contactName"
            value={contactDetail?.name ?? ""}
          />

          {/* contact selection */}
          <Card.Root className="p-6">
            <div className="mr-auto w-full max-w-xl flex flex-col gap-4">
              <h2 className="font-semibold text-(--text-heading)">Contato</h2>
              <FormField name="contactId" label="Pesquisar contato:" required>
                <Combobox
                  options={contactOptions}
                  value={selectedContactId}
                  onChange={handleContactChange}
                  onSearchChange={(search) =>
                    handleChangeFilter("name", search)
                  }
                  placeholder="Selecione um contato"
                  searchPlaceholder="Pesquisar por nome..."
                  emptyText="Nenhum contato encontrado."
                />
              </FormField>
              {contactDetail && <ContactDetailCard contact={contactDetail} />}
            </div>
          </Card.Root>

          {/* payment form */}
          <Card.Root className="p-6">
            <div className="mr-auto w-full max-w-xl flex flex-col gap-6">
              <h2 className="font-semibold text-(--text-heading)">Pagamento</h2>

              <FormField name="paymentDay" label="Dia do vencimento:" required>
                <Input
                  id="paymentDay"
                  name="paymentDay"
                  type="number"
                  min={1}
                  max={31}
                  placeholder="Ex: 10"
                  className="max-w-36"
                />
              </FormField>

              <FormField
                name="paymentType"
                label="Forma de pagamento:"
                required
              >
                <ToggleGroup.Root
                  name="paymentType"
                  value={paymentType}
                  onValueChange={(v) =>
                    setPaymentType(v as "pix" | "bank_slip")
                  }
                >
                  <ToggleGroup.Item value="pix">Pix</ToggleGroup.Item>
                  <ToggleGroup.Item value="bank_slip">Boleto</ToggleGroup.Item>
                </ToggleGroup.Root>
              </FormField>

              <FormField name="valueType" label="Tipo de valor:" required>
                <ToggleGroup.Root
                  name="valueType"
                  value={valueType}
                  onValueChange={(v) =>
                    setValueType(v as "fixed" | "undetermined")
                  }
                >
                  <ToggleGroup.Item value="fixed">Valor fixo</ToggleGroup.Item>
                  <ToggleGroup.Item value="undetermined">
                    Valor indeterminado
                  </ToggleGroup.Item>
                </ToggleGroup.Root>
              </FormField>

              {valueType === "fixed" && (
                <FormField name="amount" label="Valor (R$):" required>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    min="5"
                    placeholder="0,00"
                    className="max-w-48"
                  />
                  <p className="text-xs text-(--text-muted)">
                    Valor mínimo: R$ 5,00
                  </p>
                </FormField>
              )}

              <FormField
                name="currentMonthPayment"
                label="Gerar cobrança para o mês atual:"
                required
              >
                <ToggleGroup.Root
                  name="currentMonthPayment"
                  value={currentMonthPayment}
                  onValueChange={(v) =>
                    setCurrentMonthPayment(v as "sim" | "não")
                  }
                >
                  <ToggleGroup.Item value="sim">Sim</ToggleGroup.Item>
                  <ToggleGroup.Item value="não">Não</ToggleGroup.Item>
                </ToggleGroup.Root>
              </FormField>

              <FormField name="description" label="Descrição (opcional)">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  placeholder="Descreva a recorrência..."
                  className={cn(
                    "w-full rounded-md border border-(--border) bg-(--input) px-3 py-2 text-sm",
                    "text-(--foreground) placeholder:text-(--text-muted)",
                    "outline-none focus-visible:ring-2 focus-visible:ring-(--ring) focus-visible:ring-offset-1",
                    "disabled:cursor-not-allowed disabled:opacity-50 resize-none",
                  )}
                />
              </FormField>

              <SwitchField
                name="activeNotification"
                label="Enviar notificações ao doador"
                checked={activeNotification}
                onChange={setActiveNotification}
              />
            </div>
          </Card.Root>

          <div className="ml-auto flex w-fit max-w-xl justify-end gap-3">
            <Link to={`/campaign/${campaignId}/payment-statements`}>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" disabled={isSubmitting || !contactDetail}>
              {isSubmitting ? "Salvando..." : "Salvar recorrência"}
            </Button>
          </div>
        </Form>
      </FormErrorProvider>
    </div>
  );
}

export { CreateRecurrencePage };

import { ArrowLeft } from "lucide-react";
import { useFetcher, useNavigate } from "react-router";
import { Button } from "~/client/components/ui/button";
import { Card } from "~/client/components/ui/card";
import { FormField } from "~/client/components/ui/form-field";
import { Input } from "~/client/components/ui/input";

type ActionData = {
  success?: boolean;
  iframeUrl?: string;
  error?: string;
};

const DEFAULT_MONTH_QUANTITY = 3;
const ACTION_GENERATE_REPORT = "generateReport";

function OverduePaymentsPage() {
  const reportFetcher = useFetcher<ActionData>();
  const navigate = useNavigate();
  const iframeUrl = reportFetcher.data?.iframeUrl;

  return (
    <div className="m-7 flex flex-col gap-6">
      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("../reports")}
        >
          <ArrowLeft size={16} />
          Voltar para relatórios
        </Button>
      </div>

      <Card.Root className="rounded-lg p-6">
        <reportFetcher.Form
          method="post"
          className="flex items-end gap-4 max-md:flex-col max-md:items-stretch max-md:gap-4"
        >
          <FormField
            name="monthQuantity"
            label="Quantidade de meses sem pagamento a considerar como lapso:"
            required
            className="flex-1"
          >
            <Input
              id="monthQuantity"
              type="number"
              name="monthQuantity"
              defaultValue={DEFAULT_MONTH_QUANTITY}
              min={1}
            />
          </FormField>

          <Button
            type="submit"
            name="_action"
            value={ACTION_GENERATE_REPORT}
            isLoading={reportFetcher.state !== "idle"}
            className="max-md:w-full"
          >
            Gerar relatório
          </Button>
        </reportFetcher.Form>
      </Card.Root>

      {iframeUrl && (
        <iframe
          src={iframeUrl}
          width="100%"
          height="800px"
          title="Metabase"
          frameBorder="0"
          allowTransparency
        />
      )}
    </div>
  );
}

export { OverduePaymentsPage };

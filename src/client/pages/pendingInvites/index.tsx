import { DashedBorderCircle } from "~/client/components/iconDashedBorderCircle";
import { InviteCard, PageContainer } from "./styles";
import { MailCheck } from "lucide-react";
import { Button, FormProvider, useAutomation } from "@arkyn/components";
import {
  Form,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router";
import type { PendingInvitesLoader } from "../../types/pendingInvitesLoader";
import { useState } from "react";
import { useRoot } from "~/client/hooks/useRoot";

function PendingInvitesPage() {
  const { workspaceName, invitedBy, inviteDate } =
    useLoaderData<PendingInvitesLoader>();

  const { user } = useRoot();

  const navigation = useNavigation();

  const [responseInviteValue, setResponseInviteValue] = useState("");

  const actionData = useActionData();
  useAutomation(actionData);

  return (
    <PageContainer>
      <DashedBorderCircle
        icon={<MailCheck />}
        circleColor="rgb(var(--spotlight-primary))"
      />

      <h1>Convite recebido</h1>
      <p>Você foi convidado para se juntar a um workspace!</p>

      <InviteCard>
        <FormProvider form={<Form method="post" />}>
          <input type="hidden" name="response" value={responseInviteValue} />
          <input type="hidden" name="userId" value={user?.id} />
          <div className="workspaceName">
            <p className="label">Workspace</p>
            <p className="value">{workspaceName || "Não informado"}</p>
          </div>
          <div className="invitedBy">
            <p className="label">Convidado por</p>
            <p className="value">{invitedBy || "Não informado"}</p>
          </div>
          <div className="inviteDate">
            <div className="info">
              <p className="label">Data do Convite</p>
              <p className="value">{inviteDate || "Não informado"}</p>
            </div>
            <div className="actions">
              <Button
                name="_action"
                value="respondInvite"
                onClick={() => setResponseInviteValue("REFUSE")}
                isLoading={navigation.state !== "idle"}
                variant="outline"
                scheme="danger"
              >
                Recusar convite
              </Button>
              <Button
                name="_action"
                value="respondInvite"
                onClick={() => setResponseInviteValue("ACCEPT")}
                isLoading={navigation.state !== "idle"}
              >
                Aceitar convite
              </Button>
            </div>
          </div>
        </FormProvider>
      </InviteCard>
    </PageContainer>
  );
}

export { PendingInvitesPage };

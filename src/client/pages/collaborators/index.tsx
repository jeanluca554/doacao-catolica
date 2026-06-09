import { TabButton, TabContainer, useAutomation } from "@arkyn/components";
import {
  Outlet,
  useActionData,
  useLocation,
  useNavigate,
  useParams,
} from "react-router";

import { DeleteCollaborator } from "./components/deleteCollaborator";
import { DeleteInvite } from "./components/deleteInvite";
import { Header } from "./components/header";
import { CreateInviteCollaborator } from "./components/createInviteCollaborator";
import { UpdateCollaborator } from "./components/updateCollaborator";
import { UpdateInvite } from "./components/updateInvite";
import { Container } from "./styles";

function CollaboratorsPage() {
  const actionData = useActionData();
  useAutomation(actionData);
  const location = useLocation();
  const navigate = useNavigate();
  const { workspaceId } = useParams();

  const isPendingPath = location.pathname.endsWith("/pending");
  const activeTab = isPendingPath ? "pending" : "actives";

  return (
    <Container>
      <Header />
      <TabContainer
        key={activeTab}
        defaultValue={activeTab}
        onChange={(value) => {
          if (!workspaceId) return;

          const targetPath =
            value === "pending"
              ? `/workspaces/${workspaceId}/collaborators/pending`
              : `/workspaces/${workspaceId}/collaborators`;

          navigate(targetPath);
        }}
      >
        <TabButton value="actives">Ativos</TabButton>
        <TabButton value="pending">Convites</TabButton>
      </TabContainer>
      <Outlet />
      <CreateInviteCollaborator />
      <UpdateInvite />
      <DeleteInvite />
      <UpdateCollaborator />
      <DeleteCollaborator />
    </Container>
  );
}

export { CollaboratorsPage };

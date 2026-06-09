import { Button, Divider, Popover } from "@arkyn/components";
import { ChevronDown, Plus } from "lucide-react";
import { Link, useMatches, useNavigate } from "react-router";

import { useWorkspace } from "~/client/hooks/useWorkspace";
import { ChangeButton, Container, Header, List } from "./styles";

function ChangeWorkspace() {
  const matches = useMatches();
  const navigate = useNavigate();

  const { workspaces: rawWorkspaces, currentWorkspace } = useWorkspace();
  const workspaces = rawWorkspaces.filter(
    (workspace) => workspace.id !== currentWorkspace.id,
  );

  function navigateToCreateWorkspace() {
    navigate("/choose-workspace");
  }

  function makeToWorkspace(rawWorkspaceId: string) {
    const lastMatch = matches[matches.length - 1];
    if (!lastMatch) throw new Error("No matches found");

    const workspaceId = lastMatch.params?.workspaceId;
    if (!workspaceId) throw new Error("No workspaceId found");

    const location = lastMatch.pathname;
    const hasWorkspaceId = location.includes(workspaceId);
    if (!hasWorkspaceId) throw new Error("No workspaceId in location");

    const newLocation = location.replace(workspaceId, rawWorkspaceId);
    return newLocation;
  }

  return (
    <Popover
      closeOnClick
      button={
        <ChangeButton>
          <img src={currentWorkspace?.image} alt={currentWorkspace?.name} />
          <p>{currentWorkspace?.name}</p>
          <ChevronDown />
        </ChangeButton>
      }
    >
      <Container>
        <Header>
          <img src={currentWorkspace?.image} alt={currentWorkspace?.name} />
          <p>{currentWorkspace?.name}</p>
        </Header>

        <Divider />

        {workspaces.length > 0 && (
          <>
            <small>Alternar espaços de trabalho</small>

            <List>
              {workspaces.map((workspace) => (
                <Link key={workspace.id} to={makeToWorkspace(workspace.id)}>
                  <li>
                    <img src={workspace.image} alt={workspace.name} />
                    <p>{workspace.name}</p>
                  </li>
                </Link>
              ))}
            </List>
          </>
        )}

        <Button
          leftIcon={Plus}
          size="sm"
          variant="outline"
          onClick={navigateToCreateWorkspace}
        >
          Criar espaço de trabalho
        </Button>
      </Container>
    </Popover>
  );
}

export { ChangeWorkspace };

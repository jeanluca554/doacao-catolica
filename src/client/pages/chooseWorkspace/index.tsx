import { Button, FormProvider, Input } from "@arkyn/components";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useActionData, useLoaderData, useNavigate } from "react-router";

import type { ChooseWorkspaceLoader } from "~/client/types/chooseWorkspaceLoader";
import { CreateWorkspaceForm, ListContainer, PageContainer } from "./styles";

function ChooseWorkspacePage() {
  const { workspaces } = useLoaderData<ChooseWorkspaceLoader>();

  const navigate = useNavigate();
  const actionData = useActionData();

  const [selectedWorkspace, setSelectedWorkspace] = useState("");
  const [formType, setFormType] = useState<"create" | "select">("select");

  function handleSelectWorkspace(workspaceId: string) {
    setSelectedWorkspace(workspaceId);
    setFormType("select");
  }

  function handleCreateWorkspace() {
    setSelectedWorkspace("");
    setFormType("create");
  }

  function handleContinue() {
    navigate(`/workspaces/${selectedWorkspace}/home`);
  }

  return (
    <PageContainer>
      <div className="headerContainer">
        <strong>Seus espaços de trabalho</strong>
        <p>
          Selecione um espaço de trabalho existente existente ou crie um novo.
        </p>
      </div>

      <ListContainer>
        {workspaces.map((workspace) => (
          <li
            key={workspace.id}
            onClick={() => handleSelectWorkspace(workspace.id)}
            className={selectedWorkspace === workspace.id ? "active" : ""}
          >
            <img src={workspace.image} alt={workspace.name} />
            <strong>{workspace.name}</strong>
          </li>
        ))}

        <button onClick={handleCreateWorkspace}>
          <div className="plusCircle">
            <PlusCircle />
          </div>
          <strong>Criar novo</strong>
        </button>
      </ListContainer>

      {formType === "select" && (
        <Button disabled={selectedWorkspace === ""} onClick={handleContinue}>
          Continuar
        </Button>
      )}

      {formType === "create" && (
        <FormProvider
          fieldErrors={actionData?.cause?.fieldErrors}
          form={<CreateWorkspaceForm method="post" />}
        >
          <Input
            showAsterisk
            name="name"
            placeholder="Escreva aqui..."
            label="Nome do espaço de trabalho:"
          />
          <Button onClick={handleContinue}>Criar e continuar</Button>
        </FormProvider>
      )}
    </PageContainer>
  );
}

export { ChooseWorkspacePage };

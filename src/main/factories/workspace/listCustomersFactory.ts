import { ListWorkspacesUseCase } from "~/app/useCases/workspace/listWorkspacesUseCase";
import { ListWorkspacesController } from "~/infra/controllers/workspace/listWorkspacesController";
import { WorkspaceGateway } from "~/infra/gateways/workspace";

const workspaceGateway = new WorkspaceGateway();
const listWorkspacesUseCase = new ListWorkspacesUseCase(workspaceGateway);
const listWorkspacesController = new ListWorkspacesController(
  listWorkspacesUseCase
);

const listWorkspaces = {
  handle: listWorkspacesController.handle.bind(listWorkspacesController),
};

export { listWorkspaces };

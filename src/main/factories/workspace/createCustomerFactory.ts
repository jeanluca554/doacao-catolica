import { CreateWorkspaceUseCase } from "~/app/useCases/workspace/createWorkspaceUseCase";
import { CreateWorkspaceController } from "~/infra/controllers/workspace/createWorkspaceController";
import { WorkspaceGateway } from "~/infra/gateways/workspace";

const workspaceGateway = new WorkspaceGateway();
const createWorkspaceUseCase = new CreateWorkspaceUseCase(workspaceGateway);
const createWorkspaceController = new CreateWorkspaceController(
  createWorkspaceUseCase
);

const createWorkspace = {
  handle: createWorkspaceController.handle.bind(createWorkspaceController),
};

export { createWorkspace };

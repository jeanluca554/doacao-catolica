import { UpdateWorkspaceUseCase } from "~/app/useCases/workspace/updateWorkspaceUseCase";
import { UpdateWorkspaceController } from "~/infra/controllers/workspace/updateWorkspaceController";
import { WorkspaceGateway } from "~/infra/gateways/workspace";

const workspaceGateway = new WorkspaceGateway();
const updateWorkspaceUseCase = new UpdateWorkspaceUseCase(workspaceGateway);
const updateWorkspaceController = new UpdateWorkspaceController(
  updateWorkspaceUseCase
);

const updateWorkspace = {
  handle: updateWorkspaceController.handle.bind(updateWorkspaceController),
};

export { updateWorkspace };

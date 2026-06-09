import { UpdateCollaboratorUseCase } from "~/app/useCases/collaborator/updateCollaboratorUseCase";
import { UpdateCollaboratorController } from "~/infra/controllers/collaborator/updateCollaboratorController";
import { CollaboratorGateway } from "~/infra/gateways/collaborator";

const collaboratorGateway = new CollaboratorGateway();
const updateCollaboratorUseCase = new UpdateCollaboratorUseCase(
  collaboratorGateway,
);
const updateCollaboratorController = new UpdateCollaboratorController(
  updateCollaboratorUseCase,
);

const updateCollaborator = {
  handle: updateCollaboratorController.handle.bind(updateCollaboratorController),
};

export { updateCollaborator };

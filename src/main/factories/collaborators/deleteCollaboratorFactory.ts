import { DeleteCollaboratorUseCase } from "~/app/useCases/collaborator/deleteCollaboratorUseCase";
import { DeleteCollaboratorController } from "~/infra/controllers/collaborator/deleteCollaboratorController";
import { CollaboratorGateway } from "~/infra/gateways/collaborator";

const collaboratorGateway = new CollaboratorGateway();
const deleteCollaboratorUseCase = new DeleteCollaboratorUseCase(
  collaboratorGateway,
);
const deleteCollaboratorController = new DeleteCollaboratorController(
  deleteCollaboratorUseCase,
);

const deleteCollaborator = {
  handle: deleteCollaboratorController.handle.bind(
    deleteCollaboratorController,
  ),
};

export { deleteCollaborator };

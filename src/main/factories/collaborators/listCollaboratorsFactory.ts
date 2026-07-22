import { ListCollaboratorsUseCase } from "~/app/useCases/collaborator/listCollaboratorsUseCase";
import { ListCollaboratorsController } from "~/infra/controllers/collaborator/listCollaboratorsController";
import { CollaboratorGateway } from "~/infra/gateways/collaborator";

const collaboratorGateway = new CollaboratorGateway();
const listCollaboratorsUseCase = new ListCollaboratorsUseCase(
  collaboratorGateway,
);
const listCollaboratorsController = new ListCollaboratorsController(
  listCollaboratorsUseCase,
);

const listCollaborators = {
  handle: listCollaboratorsController.handle.bind(listCollaboratorsController),
};

export { listCollaborators };

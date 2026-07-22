import { ListInviteCollaboratorsUseCase } from "~/app/useCases/inviteCollaborator/listInviteCollaboratorsUseCase";
import { ListInviteCollaboratorsController } from "~/infra/controllers/inviteCollaborator/listInviteCollaboratorsController";
import { InviteCollaboratorGateway } from "~/infra/gateways/inviteCollaborator";

const inviteCollaboratorGateway = new InviteCollaboratorGateway();
const listInviteCollaboratorsUseCase = new ListInviteCollaboratorsUseCase(
  inviteCollaboratorGateway,
);
const listInviteCollaboratorsController =
  new ListInviteCollaboratorsController(listInviteCollaboratorsUseCase);

const listInviteCollaborators = {
  handle: listInviteCollaboratorsController.handle.bind(
    listInviteCollaboratorsController,
  ),
};

export { listInviteCollaborators };

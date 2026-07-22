import { DeleteInviteCollaboratorUseCase } from "~/app/useCases/inviteCollaborator/deleteInviteCollaboratorUseCase";
import { DeleteInviteCollaboratorController } from "~/infra/controllers/inviteCollaborator/deleteInviteCollaboratorController";
import { InviteCollaboratorGateway } from "~/infra/gateways/inviteCollaborator";

const inviteCollaboratorGateway = new InviteCollaboratorGateway();
const deleteInviteCollaboratorUseCase = new DeleteInviteCollaboratorUseCase(
  inviteCollaboratorGateway,
);
const deleteInviteCollaboratorController =
  new DeleteInviteCollaboratorController(deleteInviteCollaboratorUseCase);

const deleteInviteCollaborator = {
  handle: deleteInviteCollaboratorController.handle.bind(
    deleteInviteCollaboratorController,
  ),
};

export { deleteInviteCollaborator };

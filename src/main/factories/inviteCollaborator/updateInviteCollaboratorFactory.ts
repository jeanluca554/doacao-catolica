import { UpdateInviteCollaboratorUseCase } from "~/app/useCases/inviteCollaborator/updateInviteCollaboratorUseCase";
import { UpdateInviteCollaboratorController } from "~/infra/controllers/inviteCollaborator/updateInviteCollaboratorController";
import { InviteCollaboratorGateway } from "~/infra/gateways/inviteCollaborator";

const inviteCollaboratorGateway = new InviteCollaboratorGateway();
const updateInviteCollaboratorUseCase = new UpdateInviteCollaboratorUseCase(
  inviteCollaboratorGateway,
);
const updateInviteCollaboratorController =
  new UpdateInviteCollaboratorController(updateInviteCollaboratorUseCase);

const updateInviteCollaborator = {
  handle: updateInviteCollaboratorController.handle.bind(
    updateInviteCollaboratorController,
  ),
};

export { updateInviteCollaborator };

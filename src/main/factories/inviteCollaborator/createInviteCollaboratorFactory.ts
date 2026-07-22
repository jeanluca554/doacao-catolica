import { CreateInviteCollaboratorUseCase } from "~/app/useCases/inviteCollaborator/createInviteCollaboratorUseCase";
import { CreateInviteCollaboratorController } from "~/infra/controllers/inviteCollaborator/createInviteCollaboratorController";
import { InviteCollaboratorGateway } from "~/infra/gateways/inviteCollaborator";

const inviteCollaboratorGateway = new InviteCollaboratorGateway();
const createInviteCollaboratorUseCase = new CreateInviteCollaboratorUseCase(
  inviteCollaboratorGateway,
);
const createInviteCollaboratorController =
  new CreateInviteCollaboratorController(createInviteCollaboratorUseCase);

const createInviteCollaborator = {
  handle: createInviteCollaboratorController.handle.bind(
    createInviteCollaboratorController,
  ),
};

export { createInviteCollaborator };

import { DeclineInvitationUseCase } from "~/app/useCases/pendingInvite/declineInvitationUseCase";
import { DeclineInvitationController } from "~/infra/controllers/pendingInvite/declineInvitationController";
import { InviteCollaboratorGateway } from "~/infra/gateways/inviteCollaborator";

const gateway = new InviteCollaboratorGateway();
const useCase = new DeclineInvitationUseCase(gateway);
const controller = new DeclineInvitationController(useCase);

const declineInvitation = {
  handle: controller.handle.bind(controller),
};

export { declineInvitation };

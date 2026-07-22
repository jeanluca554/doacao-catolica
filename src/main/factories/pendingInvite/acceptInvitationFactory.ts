import { AcceptInvitationUseCase } from "~/app/useCases/pendingInvite/acceptInvitationUseCase";
import { AcceptInvitationController } from "~/infra/controllers/pendingInvite/acceptInvitationController";
import { InviteCollaboratorGateway } from "~/infra/gateways/inviteCollaborator";

const gateway = new InviteCollaboratorGateway();
const useCase = new AcceptInvitationUseCase(gateway);
const controller = new AcceptInvitationController(useCase);

const acceptInvitation = {
  handle: controller.handle.bind(controller),
};

export { acceptInvitation };

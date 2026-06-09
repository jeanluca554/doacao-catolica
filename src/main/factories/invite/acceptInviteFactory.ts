import { AcceptInviteUseCase } from "~/app/useCases/invite/acceptInviteUseCase";
import { AcceptInviteController } from "~/infra/controllers/invite/acceptInviteController";
import { InviteGateway } from "~/infra/gateways/invite";

const inviteGateway = new InviteGateway();
const acceptInviteUseCase = new AcceptInviteUseCase(inviteGateway);
const acceptInviteController = new AcceptInviteController(acceptInviteUseCase);

const acceptInvite = {
  handle: acceptInviteController.handle.bind(acceptInviteController),
};

export { acceptInvite };

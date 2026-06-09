import { UpdateInviteUseCase } from "~/app/useCases/invite/updateInviteUseCase";
import { UpdateInviteController } from "~/infra/controllers/invite/updateInviteController";
import { InviteGateway } from "~/infra/gateways/invite";

const inviteGateway = new InviteGateway();
const updateInviteUseCase = new UpdateInviteUseCase(
  inviteGateway,
);
const updateInviteController = new UpdateInviteController(
  updateInviteUseCase,
);

const updateInvite = {
  handle: updateInviteController.handle.bind(updateInviteController),
};

export { updateInvite };

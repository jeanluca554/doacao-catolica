import { DeleteInviteUseCase } from "~/app/useCases/invite/deleteInviteUseCase";
import { DeleteInviteController } from "~/infra/controllers/invite/deleteInviteController";
import { InviteGateway } from "~/infra/gateways/invite";

const inviteGateway = new InviteGateway();
const deleteInviteUseCase = new DeleteInviteUseCase(
  inviteGateway,
);
const deleteInviteController = new DeleteInviteController(
  deleteInviteUseCase,
);

const deleteInvite = {
  handle: deleteInviteController.handle.bind(deleteInviteController),
};

export { deleteInvite };

import { ListInvitesUseCase } from "~/app/useCases/invite/listInvitesUseCase";
import { ListInvitesController } from "~/infra/controllers/invite/listInvitesController";
import { InviteGateway } from "~/infra/gateways/invite";

const inviteGateway = new InviteGateway();
const listInvitesUseCase = new ListInvitesUseCase(
  inviteGateway,
);
const listInvitesController =
  new ListInvitesController(listInvitesUseCase);

const listInvites = {
  handle: listInvitesController.handle.bind(
    listInvitesController,
  ),
};

export { listInvites };

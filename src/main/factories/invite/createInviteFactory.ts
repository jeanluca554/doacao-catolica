import { CreateInviteUseCase } from "~/app/useCases/invite/createInviteUseCase";
import { CreateInviteController } from "~/infra/controllers/invite/createInviteController";
import { InviteGateway } from "~/infra/gateways/invite";

const inviteGateway = new InviteGateway();
const createInviteUseCase = new CreateInviteUseCase(
  inviteGateway,
);
const createInviteController = new CreateInviteController(
  createInviteUseCase,
);

const createInvite = {
  handle: createInviteController.handle.bind(
    createInviteController,
  ),
};

export { createInvite };

import { ListPendingInvitesUseCase } from "~/app/useCases/pendingInvite/listPendingInvitesUseCase";
import { ListPendingInvitesController } from "~/infra/controllers/pendingInvite/listPendingInvitesController";
import { PendingInviteGateway } from "~/infra/gateways/pendingInvite";

const gateway = new PendingInviteGateway();
const useCase = new ListPendingInvitesUseCase(gateway);
const controller = new ListPendingInvitesController(useCase);

const listPendingInvites = {
  handle: controller.handle.bind(controller),
};

export { listPendingInvites };

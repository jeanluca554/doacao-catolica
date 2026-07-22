import type { ListInviteCollaboratorsUseCase } from "~/app/useCases/inviteCollaborator/listInviteCollaboratorsUseCase";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class ListInviteCollaboratorsController {
  constructor(
    private listInviteCollaboratorsUseCase: ListInviteCollaboratorsUseCase,
  ) {}

  async handle(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) throw HttpAdapter.unauthorized("Unauthorized");

    const { campaignId } = route.params;
    if (!campaignId) throw HttpAdapter.badRequest("campaignId is required");

    return await this.listInviteCollaboratorsUseCase.execute(
      { campaignId },
      user.token,
    );
  }
}

export { ListInviteCollaboratorsController };

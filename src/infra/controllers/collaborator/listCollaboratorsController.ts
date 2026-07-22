import type { ListCollaboratorsUseCase } from "~/app/useCases/collaborator/listCollaboratorsUseCase";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class ListCollaboratorsController {
  constructor(private listCollaboratorsUseCase: ListCollaboratorsUseCase) {}

  async handle(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) throw HttpAdapter.unauthorized("Unauthorized");

    const { campaignId } = route.params;
    if (!campaignId) throw HttpAdapter.badRequest("campaignId is required");

    return await this.listCollaboratorsUseCase.execute(
      { campaignId },
      user.token,
    );
  }
}

export { ListCollaboratorsController };

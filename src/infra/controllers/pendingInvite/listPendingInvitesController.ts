import type { ListPendingInvitesUseCase } from "~/app/useCases/pendingInvite/listPendingInvitesUseCase";
import { redirect } from "react-router";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class ListPendingInvitesController {
  constructor(private useCase: ListPendingInvitesUseCase) {}

  async handle(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) throw redirect("/sign-in");

    return await this.useCase.execute(user.email, user.token);
  }
}

export { ListPendingInvitesController };

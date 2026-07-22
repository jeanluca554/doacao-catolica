import type { ListProjectRolesUseCase } from "~/app/useCases/projectRole/listProjectRolesUseCase";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class ListProjectRolesController {
  constructor(private listProjectRolesUseCase: ListProjectRolesUseCase) {}

  async handle(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) throw HttpAdapter.unauthorized("Unauthorized");

    return await this.listProjectRolesUseCase.execute(user.token);
  }
}

export { ListProjectRolesController };

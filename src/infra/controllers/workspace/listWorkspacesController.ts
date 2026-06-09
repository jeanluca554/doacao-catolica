import type { ListWorkspacesUseCase } from "~/app/useCases/workspace/listWorkspacesUseCase";
import { AuthMiddleware } from "~/main/middlewares/authMiddleware";
import type { RouteDTO } from "~/main/types/route";

class ListWorkspacesController {
  constructor(private listWorkspacesUseCase: ListWorkspacesUseCase) {}

  async handle(route: RouteDTO) {
    const { token, id } = await AuthMiddleware.authenticate(route);
    return await this.listWorkspacesUseCase.execute(id, token);
  }
}

export { ListWorkspacesController };

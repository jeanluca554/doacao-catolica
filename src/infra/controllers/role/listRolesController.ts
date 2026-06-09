import type { ListRolesUseCase } from "~/app/useCases/role/listRolesUseCase";

class ListRolesController {
  constructor(private listRolesUseCase: ListRolesUseCase) {}

  async handle() {
    return await this.listRolesUseCase.execute();
  }
}

export { ListRolesController };

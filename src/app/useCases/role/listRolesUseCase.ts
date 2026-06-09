import type { RoleDalDTO } from "~/domain/dal/role";

class ListRolesUseCase {
  constructor(private roleGateway: RoleDalDTO) {}

  async execute() {
    const roles = await this.roleGateway.listAll();

    return roles.map((role) => role.toJson());
  }
}

export { ListRolesUseCase };

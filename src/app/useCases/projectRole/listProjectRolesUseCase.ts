import type { ProjectRoleDalDTO } from "~/domain/dal/projectRole";

class ListProjectRolesUseCase {
  constructor(private projectRoleDal: ProjectRoleDalDTO) {}

  async execute(token: string) {
    const projectRoles = await this.projectRoleDal.listAll(token);
    return projectRoles.map((projectRole) => projectRole.toJson());
  }
}

export { ListProjectRolesUseCase };

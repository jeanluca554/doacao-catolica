import { ListProjectRolesUseCase } from "~/app/useCases/projectRole/listProjectRolesUseCase";
import { ListProjectRolesController } from "~/infra/controllers/projectRole/listProjectRolesController";
import { ProjectRoleDal } from "~/infra/dal/projectRole";

const projectRoleDal = new ProjectRoleDal();
const listProjectRolesUseCase = new ListProjectRolesUseCase(projectRoleDal);
const listProjectRolesController = new ListProjectRolesController(
  listProjectRolesUseCase,
);

const listProjectRoles = {
  handle: listProjectRolesController.handle.bind(listProjectRolesController),
};

export { listProjectRoles };

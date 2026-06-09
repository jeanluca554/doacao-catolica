import { ListRolesUseCase } from "~/app/useCases/role/listRolesUseCase";
import { ListRolesController } from "~/infra/controllers/role/listRolesController";
import {  RoleDal } from "~/infra/dal/role";

const roleDal = new RoleDal();

const listRolesUseCase = new ListRolesUseCase(
  roleDal,
);

const listRolesController = new ListRolesController(
  listRolesUseCase,
);

const listRoles = {
  handle: listRolesController.handle.bind(listRolesController),
};

export { listRoles };

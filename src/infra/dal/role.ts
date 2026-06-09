import type { RoleDalDTO } from "~/domain/dal/role";
import type { Role } from "~/domain/views/role";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { RoleMapper } from "../mappers/role";
import { listRolesSchema } from "../schemas/external/role";

class RoleDal implements RoleDalDTO {
  async listAll(): Promise<Role[]> {
    const url = "/roles/list";

    const apiResponse = await api.get(url);

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const schemaValidator = new SchemaValidatorAdapter(listRolesSchema);
    const externalRoles = schemaValidator.validate(apiResponse.response);

    return externalRoles.map(RoleMapper.toEntity);
  }
}

export { RoleDal };

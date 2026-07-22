import type { ProjectRoleDalDTO } from "~/domain/dal/projectRole";
import { ProjectRole } from "~/domain/entities/projectRole";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { externalProjectRolesSchema } from "../schemas/external/projectRole";

class ProjectRoleDal implements ProjectRoleDalDTO {
  async listAll(token: string): Promise<ProjectRole[]> {
    const apiResponse = await api.get("/project-roles/find-many", { token });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const schemaValidator = new SchemaValidatorAdapter(
      externalProjectRolesSchema,
    );
    const externalProjectRoles = schemaValidator.validate(apiResponse.response);

    return externalProjectRoles.map((role) =>
      ProjectRole.restore({
        id: role.id,
        name: role.name,
        description: role.description,
        createdAt: role.created_at,
        updatedAt: role.updated_at,
        deletedAt: role.deleted_at,
      }),
    );
  }
}

export { ProjectRoleDal };

import { Role } from "~/domain/views/role";
import type { ExternalRole } from "../schemas/external/role";

class RoleMapper {
  static toEntity(externalRole: ExternalRole) {
    return Role.restore({
      id: externalRole.id,
      name: externalRole.name,
      description: externalRole.description,
    });
  }
}

export { RoleMapper };

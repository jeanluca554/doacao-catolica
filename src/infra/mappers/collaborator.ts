import { Collaborator } from "~/domain/entities/collaborator";
import type { ExternalCollaborator } from "../schemas/external/collaborator";

class CollaboratorMapper {
  static toEntity(externalCollaborator: ExternalCollaborator) {
    return Collaborator.restore({
      id: externalCollaborator.organizationMemberId,
      active: externalCollaborator.organizationMemberActive,
      email: externalCollaborator.userEmail,
      name: externalCollaborator.organizationMemberName,
      avatar: externalCollaborator.organizationMemberAvatar,
      roleId: externalCollaborator.roleId,
      roleName: externalCollaborator.roleName,
      specialtyId: externalCollaborator.specialtyId,
      specialtyName: externalCollaborator.specialtyName,
      professionalRegistry:
        externalCollaborator.organizationMemberProfessionalRegistry,
    });
  }
}

export { CollaboratorMapper };

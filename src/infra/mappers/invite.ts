import { Invite } from "~/domain/entities/invite";
import type { ExternalInvite } from "../schemas/external/invite";

class InviteMapper {
  static toEntity(externalInvite: ExternalInvite) {
    return Invite.restore({
      id: externalInvite.id,
      email: externalInvite.email,
      name: externalInvite.name,
      avatar: externalInvite.avatar,
      roleId: externalInvite.roleId,
      roleName: externalInvite.roleName,
      specialtyId: externalInvite.specialtyId,
      specialtyName: externalInvite.specialtyName,
      activityAreaId: externalInvite.activityAreaId,
      activityAreaName: externalInvite.activityAreaName,
      organizationId: externalInvite.organizationId,
      professionalRegistry: externalInvite.professionalRegistry,
      responded: externalInvite.responded,
      respondedAt: externalInvite.respondedAt,
      status: externalInvite.status,
    });
  }
}

export { InviteMapper };

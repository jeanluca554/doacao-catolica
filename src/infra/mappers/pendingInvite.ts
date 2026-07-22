import { formatDate } from "@arkyn/shared";
import { PendingInvite } from "~/domain/entities/pendingInvite";
import type { ExternalPendingInvite } from "../schemas/external/pendingInvite";
import type { PendingInviteData } from "../services/pendingInviteService";

type PendingInviteLoaderData = {
  workspaceName: string;
  invitedBy: string;
  inviteDate: string;
  token: string;
};

class PendingInviteMapper {
  static toEntity(data: ExternalPendingInvite) {
    return PendingInvite.restore({
      id: data.invite_id,
      projectName: data.project_name,
      inviterName: data.inviting_user_name,
      inviteDate: this.formatInviteDate(data.invite_created_at),
      projectImage: data.project_image,
      invitedUserRoleId: data.invited_user_role_id,
      publicProjectId: data.project_public_id,
    });
  }

  static toLoaderData(data: PendingInviteData): PendingInviteLoaderData {
    return {
      workspaceName: data.workspaceName,
      invitedBy: data.invitedBy,
      inviteDate: this.formatInviteDate(data.sentAt),
      token: data.token,
    };
  }

  private static formatInviteDate(sentAt: string | null): string {
    if (!sentAt) return "";

    const datePart = sentAt.includes("T") ? sentAt.split("T")[0] : sentAt;
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(datePart);

    if (!isValidDate) return "";

    const parsedDate = new Date(`${datePart}T00:00:00.000Z`);
    if (Number.isNaN(parsedDate.getTime())) return "";

    return formatDate([datePart], "timestamp", "DD/MM/YYYY");
  }
}

export { PendingInviteMapper };
export type { PendingInviteLoaderData };

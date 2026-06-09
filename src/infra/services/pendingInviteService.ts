import { HttpAdapter } from "../adapters/httpAdapter";
import { JwtAdapter } from "../adapters/jwtAdapter";

type PendingInviteTokenPayload = {
  organizationName?: unknown;
  invitedByName?: unknown;
  sentAt?: unknown;
};

type PendingInviteData = {
  workspaceName: string;
  invitedBy: string;
  sentAt: string | null;
  token: string;
};

class PendingInviteService {
  static parseToken(token?: string): PendingInviteData {
    if (!token) {
      throw HttpAdapter.badRequest("Token do convite não informado");
    }

    const decoded = JwtAdapter.decode(token) as PendingInviteTokenPayload;

    return {
      workspaceName:
        typeof decoded.organizationName === "string"
          ? decoded.organizationName
          : "",
      invitedBy:
        typeof decoded.invitedByName === "string" ? decoded.invitedByName : "",
      sentAt: typeof decoded.sentAt === "string" ? decoded.sentAt : null,
      token,
    };
  }
}

export { PendingInviteService };
export type { PendingInviteData };

import type { PendingInvite } from "../entities/pendingInvite";

type PendingInvitesResult = {
  items: PendingInvite[];
};

type PendingInviteGatewayDTO = {
  findAll(email: string, token: string): Promise<PendingInvitesResult>;
};

export type { PendingInviteGatewayDTO, PendingInvitesResult };

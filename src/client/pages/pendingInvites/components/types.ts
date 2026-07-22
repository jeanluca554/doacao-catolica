import type { PendingInvitesLoader } from "~/client/types/pendingInvitesLoader";

type PendingInvite =
  PendingInvitesLoader["pendingInvites"]["items"][number];

export type { PendingInvite };

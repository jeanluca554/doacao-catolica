import { loader } from "~/main/routes/route.pendingInvites";

type PendingInvitesLoader = Awaited<ReturnType<typeof loader>>;

export type { PendingInvitesLoader };

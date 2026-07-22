import type { loader } from "~/main/routes/route.campaignsGroups";

type CampaignGroupsLoader = Awaited<ReturnType<typeof loader>>;

export type { CampaignGroupsLoader };

import { loader } from "~/main/routes/route.myCampaigns";

type CampaignsLoader = Awaited<ReturnType<typeof loader>>;

export type { CampaignsLoader };

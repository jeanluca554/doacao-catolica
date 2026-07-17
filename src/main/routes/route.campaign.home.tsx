import type { Route } from "./+types/route.campaign.home";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { getCampaignOverview } from "~/main/factories/campaignOverview/getCampaignOverviewFactory";
import { CampaignHomePage } from "~/client/pages/campaignHome";

export async function loader(args: Route.LoaderArgs) {
  const route = await RouteAdapter.adaptRoute(args);
  return getCampaignOverview.handle(route);
}

export default function CampaignHomeRoute() {
  return <CampaignHomePage />;
}

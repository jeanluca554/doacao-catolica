import { SearchParams } from "../shared/searchParams";

type Filter = {
  month?: number;
  year?: number;
};

class CampaignOverviewSearchParams extends SearchParams<Filter> {}

export { CampaignOverviewSearchParams };

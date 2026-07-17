import type { CampaignOverviewSearchParams } from "~/app/search/campaignOverviewSearchParams";

type CampaignOverviewData = {
  totalRaised: number;
  monthRaised: number;
  previousMonthRaised: number;
  growthPercentage: number | null;
  monthlyGoal: number | null;
  totalGoal: number | null;
  totalGoalProgressPercentage: number | null;
  monthlyGoalProgressPercentage: number | null;
  totalGoalRemaining: number | null;
  monthlyGoalRemaining: number | null;
  supporters: number;
  newSupportersLast7Days: number;
  averageTicketMonth: number;
  averageTicketPreviousMonth: number;
  averageTicketVariationPercentage: number | null;
  oneTimeCustomers: number;
  recurringCustomers: number;
};

type CampaignOverviewGatewayDTO = {
  getOverview(
    campaignId: string,
    searchParams: CampaignOverviewSearchParams,
  ): Promise<CampaignOverviewData>;
};

export type { CampaignOverviewGatewayDTO, CampaignOverviewData };

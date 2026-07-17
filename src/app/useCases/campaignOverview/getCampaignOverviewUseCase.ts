import { CampaignOverviewSearchParams } from "~/app/search/campaignOverviewSearchParams";
import type { CampaignOverviewGatewayDTO } from "~/domain/gateways/campaignOverview";

type InputProps = {
  campaignId: string;
  month?: number;
  year?: number;
};

class GetCampaignOverviewUseCase {
  constructor(private gateway: CampaignOverviewGatewayDTO) {}

  async execute({ campaignId, month, year }: InputProps) {
    const searchParams = new CampaignOverviewSearchParams({
      filter: { month, year },
    });

    return await this.gateway.getOverview(campaignId, searchParams);
  }
}

export { GetCampaignOverviewUseCase };

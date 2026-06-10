import { CampaignSearchParams } from "~/app/search/campaignSearchParams";
import type { CampaignGatewayDTO } from "~/domain/gateways/campaign";

type InputProps = {
  page?: number | null;
  token: string;
};

class ListCampaignsUseCase {
  constructor(private campaignGateway: CampaignGatewayDTO) {}

  async execute(input: InputProps) {
    const { page, token } = input;
    const searchParams = new CampaignSearchParams({ page });

    const campaigns = await this.campaignGateway.listCampaigns(
      searchParams,
      token,
    );

    return campaigns.toJson();
  }
}

export { ListCampaignsUseCase };

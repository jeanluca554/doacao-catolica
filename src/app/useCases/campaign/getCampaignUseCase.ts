import type { CampaignGatewayDTO } from "~/domain/gateways/campaign";

type InputProps = {
  id: string;
  token: string;
};

class GetCampaignUseCase {
  constructor(private campaignGateway: CampaignGatewayDTO) {}

  async execute(input: InputProps) {
    const { id, token } = input;
    const campaign = await this.campaignGateway.getCampaign(id, token);
    return campaign.toJson();
  }
}

export { GetCampaignUseCase };

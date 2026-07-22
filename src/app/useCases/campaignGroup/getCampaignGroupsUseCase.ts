import type { CampaignGroupGatewayDTO } from "~/domain/gateways/campaignGroup";

class GetCampaignGroupsUseCase {
  constructor(private gateway: CampaignGroupGatewayDTO) {}

  async execute() {
    return await this.gateway.getCampaignGroups();
  }
}

export { GetCampaignGroupsUseCase };

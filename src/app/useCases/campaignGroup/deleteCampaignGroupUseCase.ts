import type { CampaignGroupGatewayDTO } from "~/domain/gateways/campaignGroup";

class DeleteCampaignGroupUseCase {
  constructor(private gateway: CampaignGroupGatewayDTO) {}

  async execute(id: string): Promise<void> {
    await this.gateway.deleteCampaignGroup(id);
  }
}

export { DeleteCampaignGroupUseCase };

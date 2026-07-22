import type {
  CampaignGroupGatewayDTO,
  CampaignGroupInput,
} from "~/domain/gateways/campaignGroup";

class UpdateCampaignGroupUseCase {
  constructor(private gateway: CampaignGroupGatewayDTO) {}

  async execute(id: string, input: CampaignGroupInput): Promise<void> {
    await this.gateway.updateCampaignGroup(id, input);
  }
}

export { UpdateCampaignGroupUseCase };

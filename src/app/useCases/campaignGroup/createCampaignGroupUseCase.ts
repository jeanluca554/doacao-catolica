import type {
  CampaignGroupGatewayDTO,
  CampaignGroupInput,
} from "~/domain/gateways/campaignGroup";

class CreateCampaignGroupUseCase {
  constructor(private gateway: CampaignGroupGatewayDTO) {}

  async execute(input: CampaignGroupInput): Promise<void> {
    await this.gateway.createCampaignGroup(input);
  }
}

export { CreateCampaignGroupUseCase };

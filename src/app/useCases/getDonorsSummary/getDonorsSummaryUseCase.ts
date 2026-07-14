import type { DonorGatewayDTO, DonorsSummary } from "~/domain/gateways/donor";

class GetDonorsSummaryUseCase {
  constructor(private donorGateway: DonorGatewayDTO) {}

  async execute(campaignId: string): Promise<DonorsSummary> {
    return await this.donorGateway.getDonorsSummary(campaignId);
  }
}

export { GetDonorsSummaryUseCase };

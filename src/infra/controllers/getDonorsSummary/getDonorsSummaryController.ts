import type { GetDonorsSummaryUseCase } from "~/app/useCases/getDonorsSummary/getDonorsSummaryUseCase";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import type { DonorsSummary } from "~/domain/gateways/donor";
import type { RouteDTO } from "~/main/types/route";

class GetDonorsSummaryController {
  constructor(private getDonorsSummaryUseCase: GetDonorsSummaryUseCase) {}

  async handle(route: RouteDTO): Promise<DonorsSummary> {
    const { campaignId } = route.params;
    if (!campaignId) throw HttpAdapter.badRequest("campaignId is required");

    return await this.getDonorsSummaryUseCase.execute(campaignId);
  }
}

export { GetDonorsSummaryController };

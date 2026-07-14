import { GetDonorsSummaryUseCase } from "~/app/useCases/getDonorsSummary/getDonorsSummaryUseCase";
import { GetDonorsSummaryController } from "~/infra/controllers/getDonorsSummary/getDonorsSummaryController";
import { DonorGateway } from "~/infra/gateways/donor";

const donorGateway = new DonorGateway();
const getDonorsSummaryUseCase = new GetDonorsSummaryUseCase(donorGateway);
const getDonorsSummaryController = new GetDonorsSummaryController(getDonorsSummaryUseCase);

const getDonorsSummary = {
  handle: getDonorsSummaryController.handle.bind(getDonorsSummaryController),
};

export { getDonorsSummary };

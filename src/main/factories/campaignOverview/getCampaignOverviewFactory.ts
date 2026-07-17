import { GetCampaignOverviewUseCase } from "~/app/useCases/campaignOverview/getCampaignOverviewUseCase";
import { GetCampaignOverviewController } from "~/infra/controllers/campaignOverview/getCampaignOverviewController";
import { CampaignOverviewGateway } from "~/infra/gateways/campaignOverview";

const campaignOverviewGateway = new CampaignOverviewGateway();
const getCampaignOverviewUseCase = new GetCampaignOverviewUseCase(
  campaignOverviewGateway,
);
const getCampaignOverviewController = new GetCampaignOverviewController(
  getCampaignOverviewUseCase,
);

const getCampaignOverview = {
  handle: getCampaignOverviewController.handle.bind(
    getCampaignOverviewController,
  ),
};

export { getCampaignOverview };

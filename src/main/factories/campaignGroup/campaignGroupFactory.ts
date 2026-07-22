import { CreateCampaignGroupUseCase } from "~/app/useCases/campaignGroup/createCampaignGroupUseCase";
import { DeleteCampaignGroupUseCase } from "~/app/useCases/campaignGroup/deleteCampaignGroupUseCase";
import { GetCampaignGroupsUseCase } from "~/app/useCases/campaignGroup/getCampaignGroupsUseCase";
import { UpdateCampaignGroupUseCase } from "~/app/useCases/campaignGroup/updateCampaignGroupUseCase";
import { CampaignGroupController } from "~/infra/controllers/campaignGroup/campaignGroupController";
import { CampaignGroupGateway } from "~/infra/gateways/campaignGroup";

const gateway = new CampaignGroupGateway();
const controller = new CampaignGroupController(
  new GetCampaignGroupsUseCase(gateway),
  new CreateCampaignGroupUseCase(gateway),
  new UpdateCampaignGroupUseCase(gateway),
  new DeleteCampaignGroupUseCase(gateway),
);

const campaignGroupFactory = {
  handleLoader: controller.handleLoader.bind(controller),
  handleAction: controller.handleAction.bind(controller),
};

export { campaignGroupFactory };

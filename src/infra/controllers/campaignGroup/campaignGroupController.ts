import type { CreateCampaignGroupUseCase } from "~/app/useCases/campaignGroup/createCampaignGroupUseCase";
import type { DeleteCampaignGroupUseCase } from "~/app/useCases/campaignGroup/deleteCampaignGroupUseCase";
import type { GetCampaignGroupsUseCase } from "~/app/useCases/campaignGroup/getCampaignGroupsUseCase";
import type { UpdateCampaignGroupUseCase } from "~/app/useCases/campaignGroup/updateCampaignGroupUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import {
  createCampaignGroupSchema,
  deleteCampaignGroupSchema,
  updateCampaignGroupSchema,
} from "~/infra/schemas/internal/campaignGroup";
import type { RouteDTO } from "~/main/types/route";

class CampaignGroupController {
  constructor(
    private getCampaignGroupsUseCase: GetCampaignGroupsUseCase,
    private createCampaignGroupUseCase: CreateCampaignGroupUseCase,
    private updateCampaignGroupUseCase: UpdateCampaignGroupUseCase,
    private deleteCampaignGroupUseCase: DeleteCampaignGroupUseCase,
  ) {}

  async handleLoader() {
    const campaignGroups = await this.getCampaignGroupsUseCase.execute();

    return {
      campaignGroups: {
        data: campaignGroups.data.map((campaignGroup) =>
          campaignGroup.toJson(),
        ),
        meta: campaignGroups.meta,
      },
    };
  }

  async handleAction(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);

    switch (body._action) {
      case "createCampaignGroup": {
        const validated = new SchemaValidatorAdapter(
          createCampaignGroupSchema,
        ).validate(body);

        await this.createCampaignGroupUseCase.execute({
          name: validated.name,
          description: validated.description,
        });

        return {
          toast: {
            message: "Grupo de campanha criado com sucesso!",
            type: "success" as const,
          },
        };
      }
      case "updateCampaignGroup": {
        const validated = new SchemaValidatorAdapter(
          updateCampaignGroupSchema,
        ).validate(body);

        await this.updateCampaignGroupUseCase.execute(validated.id, {
          name: validated.name,
          description: validated.description,
        });

        return {
          toast: {
            message: "Grupo de campanha atualizado com sucesso!",
            type: "success" as const,
          },
        };
      }
      case "deleteCampaignGroup": {
        const validated = new SchemaValidatorAdapter(
          deleteCampaignGroupSchema,
        ).validate(body);

        await this.deleteCampaignGroupUseCase.execute(validated.id);

        return {
          toast: {
            message: "Grupo de campanha removido com sucesso!",
            type: "success" as const,
          },
        };
      }
      default:
        throw HttpAdapter.badRequest("Ação inválida");
    }
  }
}

export { CampaignGroupController };

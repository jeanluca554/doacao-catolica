import { CampaignGroup } from "~/domain/entities/campaignGroup";
import type {
  CampaignGroupGatewayDTO,
  CampaignGroupInput,
  CampaignGroupResult,
} from "~/domain/gateways/campaignGroup";
import { environmentVariables } from "~/main/config/environmentVariables";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { apiDonation } from "../http/apiDonation.server";
import {
  externalCampaignGroupsSchema,
  type ExternalCampaignGroup,
} from "../schemas/external/campaignGroup";

class CampaignGroupGateway implements CampaignGroupGatewayDTO {
  private get headers() {
    return { "api-key": environmentVariables.API_KEY_DONATION };
  }

  private toEntity(group: ExternalCampaignGroup): CampaignGroup {
    return CampaignGroup.restore({
      id: group.id ?? group.uuid ?? group.public_id ?? "",
      name: group.name,
      description: group.description,
      createdAt: group.created_at ?? group.created_at2 ?? group.createdAt ?? "",
    });
  }

  async getCampaignGroups(): Promise<CampaignGroupResult> {
    const apiResponse = await apiDonation.get("/api/account_groups", {
      headers: this.headers,
    });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const validator = new SchemaValidatorAdapter(
      externalCampaignGroupsSchema,
    );
    const campaignGroups = validator.validate(apiResponse.response);

    return {
      data: campaignGroups.data.map((group) => this.toEntity(group)),
      meta: campaignGroups.meta,
    };
  }

  async createCampaignGroup(input: CampaignGroupInput): Promise<void> {
    const apiResponse = await apiDonation.post("/api/account_groups", {
      body: {
        name: input.name,
        description: input.description,
      },
      headers: this.headers,
    });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }

  async updateCampaignGroup(
    id: string,
    input: CampaignGroupInput,
  ): Promise<void> {
    const apiResponse = await apiDonation.put(`/api/account_groups/${id}`, {
      body: {
        name: input.name,
        description: input.description,
      },
      headers: this.headers,
    });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }

  async deleteCampaignGroup(id: string): Promise<void> {
    const apiResponse = await apiDonation.delete(`/api/account_groups/${id}`, {
      headers: this.headers,
    });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }
}

export { CampaignGroupGateway };

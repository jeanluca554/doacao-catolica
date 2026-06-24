import type { CampaignSearchParams } from "~/app/search/campaignSearchParams";
import { SearchResult } from "~/app/shared/searchResult";
import type { Campaign } from "~/domain/entities/campaign";
import type { CampaignGatewayDTO } from "~/domain/gateways/campaign";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { CampaignMapper } from "../mappers/campaign";
import {
  externalCampaignSchema,
  listCampaignsSchema,
} from "../schemas/external/campaign";

class CampaignGateway implements CampaignGatewayDTO {
  async listCampaigns(
    searchParams: CampaignSearchParams,
    token: string,
  ): Promise<SearchResult<Campaign>> {
    let url = "/projects/summary";
    url += searchParams.toExternal();

    const apiResponse = await api.get(url, { token });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const schemaValidator = new SchemaValidatorAdapter(listCampaignsSchema);
    const externalCampaigns = schemaValidator.validate(apiResponse.response);

    return new SearchResult({
      data: externalCampaigns.items.map(CampaignMapper.toEntity),
      meta: {
        page: externalCampaigns.current_page,
        pageLimit: externalCampaigns.per_page,
        totalItems: externalCampaigns.total,
      },
    });
  }

  async getCampaign(id: string, token: string): Promise<Campaign> {
    const apiResponse = await api.get(`/project/find-one/${id}`, { token });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const schemaValidator = new SchemaValidatorAdapter(externalCampaignSchema);
    const externalCampaign = schemaValidator.validate(apiResponse.response);

    return CampaignMapper.toEntity(externalCampaign);
  }
}

export { CampaignGateway };

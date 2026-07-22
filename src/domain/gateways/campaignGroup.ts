import type { CampaignGroup } from "../entities/campaignGroup";

type CampaignGroupMeta = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
};

type CampaignGroupResult = {
  data: CampaignGroup[];
  meta: CampaignGroupMeta;
};

type CampaignGroupInput = {
  name: string;
  description: string;
};

type CampaignGroupGatewayDTO = {
  getCampaignGroups(): Promise<CampaignGroupResult>;
  createCampaignGroup(input: CampaignGroupInput): Promise<void>;
  updateCampaignGroup(
    id: string,
    input: CampaignGroupInput,
  ): Promise<void>;
  deleteCampaignGroup(id: string): Promise<void>;
};

export type {
  CampaignGroupGatewayDTO,
  CampaignGroupInput,
  CampaignGroupMeta,
  CampaignGroupResult,
};

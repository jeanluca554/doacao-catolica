type CampaignGroupModel = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
};

type MetaModel = {
  currentPage: number;
  totalItems: number;
  totalPages: number;
};

export type { CampaignGroupModel, MetaModel };

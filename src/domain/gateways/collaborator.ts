import { SearchResult } from "~/app/shared/searchResult";
import type { Collaborator } from "../entities/collaborator";

type CollaboratorGatewayDTO = {
  listCollaborators: (
    campaignId: string,
    token: string,
  ) => Promise<SearchResult<Collaborator>>;
};

export type { CollaboratorGatewayDTO };

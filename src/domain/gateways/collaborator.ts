import type { CollaboratorSearchParams } from "~/app/search/collaboratorSearchParams";
import { SearchResult } from "~/app/shared/searchResult";
import type {
  DeleteCollaboratorType,
  UpdateCollaboratorType,
} from "~/infra/schemas/internal/collaborator";
import type { Collaborator } from "../entities/collaborator";

type CollaboratorGatewayDTO = {
  listCollaborators: (
    searchParams: CollaboratorSearchParams,
  ) => Promise<SearchResult<Collaborator>>;
  updateCollaborator: (props: UpdateCollaboratorType) => Promise<void>;
  deleteCollaborator: (props: DeleteCollaboratorType) => Promise<void>;
};

export type { CollaboratorGatewayDTO };

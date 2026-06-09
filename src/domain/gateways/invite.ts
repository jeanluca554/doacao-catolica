import type { InviteSearchParams } from "~/app/search/inviteSearchParams";
import { SearchResult } from "~/app/shared/searchResult";
import type {
  AcceptInviteType,
  DeleteInviteType,
  CreateInviteType,
  UpdateInviteType,
} from "~/infra/schemas/internal/collaborator";
import type { Invite } from "../entities/invite";

type InviteGatewayDTO = {
  listInvites: (
    searchParams: InviteSearchParams,
  ) => Promise<SearchResult<Invite>>;
  createInvite: (props: CreateInviteType) => Promise<void>;
  updateInvite: (props: UpdateInviteType) => Promise<void>;
  deleteInvite: (props: DeleteInviteType) => Promise<void>;
  acceptInvite: (props: AcceptInviteType, token: string) => Promise<void>;
};

export type { InviteGatewayDTO };

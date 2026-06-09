import type { InviteSearchParams } from "~/app/search/inviteSearchParams";
import { SearchResult } from "~/app/shared/searchResult";
import type { Invite } from "~/domain/entities/invite";
import type { InviteGatewayDTO } from "~/domain/gateways/invite";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { InviteMapper } from "../mappers/invite";
import { listInvitesSchema } from "../schemas/external/invite";
import type {
  AcceptInviteType,
  DeleteInviteType,
  CreateInviteType,
  UpdateInviteType,
} from "../schemas/internal/collaborator";

class InviteGateway implements InviteGatewayDTO {
  async listInvites(
    searchParams: InviteSearchParams,
  ): Promise<SearchResult<Invite>> {
    let url = "/organization-member-invites/list-view";
    url += searchParams.toExternal();

    const apiResponse = await api.get(url);

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const schemaValidator = new SchemaValidatorAdapter(listInvitesSchema);
    const externalInvites = schemaValidator.validate(apiResponse.response);

    return new SearchResult({
      data: externalInvites.items.map((invite) =>
        InviteMapper.toEntity(invite),
      ),
      meta: {
        page: externalInvites.page,
        pageLimit: externalInvites.pagesize,
        totalItems: externalInvites.total,
      },
    });
  }

  async createInvite(body: CreateInviteType): Promise<void> {
    const apiResponse = await api.post("/organization-member-invites/send", {
      body,
    });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }

  async updateInvite(body: UpdateInviteType): Promise<void> {
    const apiResponse = await api.post("/organization-member-invites/update", {
      body,
    });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }

  async deleteInvite(body: DeleteInviteType): Promise<void> {
    const apiResponse = await api.delete(
      `/organization-member-invites/delete/${body.id}`,
    );

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }

  async acceptInvite(body: AcceptInviteType, token: string): Promise<void> {
    const apiResponse = await api.post("/organization-member-invites/respond", {
      body,
      headers: {
        token,
      },
    });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }
}

export { InviteGateway };

import type {
  PendingInviteGatewayDTO,
  PendingInvitesResult,
} from "~/domain/gateways/pendingInvite";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { PendingInviteMapper } from "../mappers/pendingInvite";
import { externalPendingInvitesSchema } from "../schemas/external/pendingInvite";

class PendingInviteGateway implements PendingInviteGatewayDTO {
  async findAll(
    email: string,
    token: string,
  ): Promise<PendingInvitesResult> {
    const encodedEmail = encodeURIComponent(email);
    const apiResponse = await api.get(
      `/list-user-project-invites/${encodedEmail}`,
      { token },
    );

    if (!apiResponse.success) {
      throw HttpAdapter.badRequest(
        apiResponse.message,
        apiResponse.response,
      );
    }

    const validator = new SchemaValidatorAdapter(
      externalPendingInvitesSchema,
    );
    const response = validator.validate(apiResponse.response);

    return {
      items: response.map((invite) =>
        PendingInviteMapper.toEntity(invite),
      ),
    };
  }
}

export { PendingInviteGateway };

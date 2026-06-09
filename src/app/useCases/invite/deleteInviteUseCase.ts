import type { InviteGatewayDTO } from "~/domain/gateways/invite";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import type { DeleteInviteType } from "~/infra/schemas/internal/collaborator";

class DeleteInviteUseCase {
  constructor(private inviteGateway: InviteGatewayDTO) {}

  async execute(props: DeleteInviteType) {
    await this.inviteGateway.deleteInvite(props);
    return HttpAdapter.success("Convite removido com sucesso!");
  }
}

export { DeleteInviteUseCase };

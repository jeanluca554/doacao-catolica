import type { InviteGatewayDTO } from "~/domain/gateways/invite";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import type { UpdateInviteType } from "~/infra/schemas/internal/collaborator";

class UpdateInviteUseCase {
  constructor(private inviteGateway: InviteGatewayDTO) {}

  async execute(props: UpdateInviteType) {
    await this.inviteGateway.updateInvite(props);
    return HttpAdapter.success("Convite atualizado com sucesso!");
  }
}

export { UpdateInviteUseCase };

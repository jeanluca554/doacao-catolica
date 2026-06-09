import type { InviteGatewayDTO } from "~/domain/gateways/invite";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import type { CreateInviteType } from "~/infra/schemas/internal/collaborator";

class CreateInviteUseCase {
  constructor(private inviteGateway: InviteGatewayDTO) {}

  async execute(props: CreateInviteType) {
    await this.inviteGateway.createInvite(props);
    return HttpAdapter.created("Convite enviado com sucesso!");
  }
}

export { CreateInviteUseCase };

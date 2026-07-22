import type { PendingInviteGatewayDTO } from "~/domain/gateways/pendingInvite";

class ListPendingInvitesUseCase {
  constructor(private gateway: PendingInviteGatewayDTO) {}

  async execute(email: string, token: string) {
    const pendingInvites = await this.gateway.findAll(email, token);

    return {
      items: pendingInvites.items.map((invite) => invite.toJson()),
    };
  }
}

export { ListPendingInvitesUseCase };

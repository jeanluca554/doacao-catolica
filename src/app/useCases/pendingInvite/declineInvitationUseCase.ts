import type { InviteCollaboratorGatewayDTO } from "~/domain/gateways/inviteCollaborator";

class DeclineInvitationUseCase {
  constructor(private gateway: InviteCollaboratorGatewayDTO) {}

  async execute(id: string, token: string) {
    await this.gateway.declineInvitation(id, token);
  }
}

export { DeclineInvitationUseCase };

import type { InviteCollaboratorGatewayDTO } from "~/domain/gateways/inviteCollaborator";

class DeleteInviteCollaboratorUseCase {
  constructor(private gateway: InviteCollaboratorGatewayDTO) {}

  async execute(id: string, token: string): Promise<void> {
    await this.gateway.deleteInviteCollaborator(id, token);
  }
}

export { DeleteInviteCollaboratorUseCase };

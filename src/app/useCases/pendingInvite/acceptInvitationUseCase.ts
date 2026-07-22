import type {
  AcceptInvitationInput,
  InviteCollaboratorGatewayDTO,
} from "~/domain/gateways/inviteCollaborator";

class AcceptInvitationUseCase {
  constructor(private gateway: InviteCollaboratorGatewayDTO) {}

  async execute(input: AcceptInvitationInput, token: string) {
    await this.gateway.acceptInvitation(input, token);
  }
}

export { AcceptInvitationUseCase };

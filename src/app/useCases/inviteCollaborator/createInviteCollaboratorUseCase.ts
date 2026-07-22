import type { InviteCollaboratorGatewayDTO } from "~/domain/gateways/inviteCollaborator";

type InputProps = {
  projectId: string;
  inviterId: number;
  invitedUserEmail: string;
  invitedUserRoleId: string;
};

class CreateInviteCollaboratorUseCase {
  constructor(private gateway: InviteCollaboratorGatewayDTO) {}

  async execute(input: InputProps, token: string): Promise<void> {
    await this.gateway.createInviteCollaborator(input, token);
  }
}

export { CreateInviteCollaboratorUseCase };

import type { InviteCollaboratorGatewayDTO } from "~/domain/gateways/inviteCollaborator";

type InputProps = {
  id: string;
  roleId: string;
};

class UpdateInviteCollaboratorUseCase {
  constructor(private gateway: InviteCollaboratorGatewayDTO) {}

  async execute(input: InputProps, token: string): Promise<void> {
    await this.gateway.updateInviteCollaborator(input, token);
  }
}

export { UpdateInviteCollaboratorUseCase };

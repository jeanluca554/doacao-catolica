import type { InviteCollaboratorGatewayDTO } from "~/domain/gateways/inviteCollaborator";

type InputProps = {
  campaignId: string;
};

class ListInviteCollaboratorsUseCase {
  constructor(private gateway: InviteCollaboratorGatewayDTO) {}

  async execute(input: InputProps, token: string) {
    const result = await this.gateway.listInviteCollaborators(
      input.campaignId,
      token,
    );

    return result.toJson();
  }
}

export { ListInviteCollaboratorsUseCase };

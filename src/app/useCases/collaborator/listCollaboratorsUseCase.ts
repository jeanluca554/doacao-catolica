import type { CollaboratorGatewayDTO } from "~/domain/gateways/collaborator";

type InputProps = {
  campaignId: string;
};

class ListCollaboratorsUseCase {
  constructor(private gateway: CollaboratorGatewayDTO) {}

  async execute(input: InputProps, token: string) {
    const result = await this.gateway.listCollaborators(
      input.campaignId,
      token,
    );

    return result.toJson();
  }
}

export { ListCollaboratorsUseCase };

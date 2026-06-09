import type { CollaboratorGatewayDTO } from "~/domain/gateways/collaborator";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import type { UpdateCollaboratorType } from "~/infra/schemas/internal/collaborator";

class UpdateCollaboratorUseCase {
  constructor(private collaboratorGateway: CollaboratorGatewayDTO) {}

  async execute(props: UpdateCollaboratorType) {
    await this.collaboratorGateway.updateCollaborator(props);
    return HttpAdapter.success("Colaborador atualizado com sucesso!");
  }
}

export { UpdateCollaboratorUseCase };

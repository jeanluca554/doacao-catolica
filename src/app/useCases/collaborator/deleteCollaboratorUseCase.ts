import type { CollaboratorGatewayDTO } from "~/domain/gateways/collaborator";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import type { DeleteCollaboratorType } from "~/infra/schemas/internal/collaborator";

class DeleteCollaboratorUseCase {
  constructor(private collaboratorGateway: CollaboratorGatewayDTO) {}

  async execute(props: DeleteCollaboratorType) {
    await this.collaboratorGateway.deleteCollaborator(props);
    return HttpAdapter.success("Colaborador removido com sucesso!");
  }
}

export { DeleteCollaboratorUseCase };

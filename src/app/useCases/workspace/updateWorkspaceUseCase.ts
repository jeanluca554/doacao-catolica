import type { WorkspaceGatewayDTO } from "~/domain/gateways/workspace";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";

type InputProps = {
  id: string;
  name: string;
  description: string;
  userId: string;
  image: string;
  status: "active" | "inactive";
};

class UpdateWorkspaceUseCase {
  constructor(private workspaceGateway: WorkspaceGatewayDTO) {}

  async execute(input: InputProps, token: string) {
    await this.workspaceGateway.updateWorkspace(input, token);
    return HttpAdapter.updated("Espaço de trabalho atualizado com sucesso!");
  }
}

export { UpdateWorkspaceUseCase };

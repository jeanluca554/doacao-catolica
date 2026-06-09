import type { WorkspaceGatewayDTO } from "~/domain/gateways/workspace";
import { RedirectServerAdapter } from "~/infra/adapters/redirectServerAdapter";

type InputProps = {
  name: string;
  description: string;
  userId: string;
  image: string;
  status: "active" | "inactive";
};

class CreateWorkspaceUseCase {
  constructor(private workspaceGateway: WorkspaceGatewayDTO) {}

  async execute(input: InputProps, token: string) {
    const workspaceId = await this.workspaceGateway.createWorkspace(
      input,
      token,
    );

    return workspaceId;
  }
}

export { CreateWorkspaceUseCase };

import type { WorkspaceGatewayDTO } from "~/domain/gateways/workspace";

class ListWorkspacesUseCase {
  constructor(private workspaceGateway: WorkspaceGatewayDTO) {}

  async execute(userId: string, token: string) {
    const workspaces = await this.workspaceGateway.listWorkspaces(
      userId,
      token,
    );

    return workspaces.map((workspace) => workspace.toJson());
  }
}

export { ListWorkspacesUseCase };

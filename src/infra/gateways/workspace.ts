import type { Workspace } from "~/domain/entities/workspace";
import type {
  CreateWorkspaceProps,
  UpdateWorkspaceProps,
  WorkspaceGatewayDTO,
} from "~/domain/gateways/workspace";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { WorkspaceMapper } from "../mappers/workspace";
import { externalWorkspacesSchema } from "../schemas/external/workspace";

class WorkspaceGateway implements WorkspaceGatewayDTO {
  async listWorkspaces(userId: string, token: string): Promise<Workspace[]> {
    const url = `/organizations/list?userId=${userId}`;
    const apiResponse = await api.get(url, { token });
    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const tokenValidator = new SchemaValidatorAdapter(externalWorkspacesSchema);
    const validatedData = tokenValidator.validate(apiResponse.response);

    return validatedData.items.map(WorkspaceMapper.toEntity);
  }

  async createWorkspace(
    body: CreateWorkspaceProps,
    token: string,
  ): Promise<string> {
    const apiResponse = await api.post("/organizations", {
      body: { ...body, status: undefined, active: body.status === "active" },
      token,
    });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const workspaceId = apiResponse.response?.id;
    if (!workspaceId) throw HttpAdapter.badGateway("Workspace ID not found");

    return workspaceId;
  }

  async updateWorkspace(
    body: UpdateWorkspaceProps,
    token: string,
  ): Promise<void> {
    const apiResponse = await api.put("/organizations", { body, token });
    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }
}

export { WorkspaceGateway };

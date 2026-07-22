import { SearchResult } from "~/app/shared/searchResult";
import { Collaborator } from "~/domain/entities/collaborator";
import type { CollaboratorGatewayDTO } from "~/domain/gateways/collaborator";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { externalCollaboratorsSchema } from "../schemas/external/collaborator";

class CollaboratorGateway implements CollaboratorGatewayDTO {
  async listCollaborators(
    campaignId: string,
    token: string,
  ): Promise<SearchResult<Collaborator>> {
    const apiResponse = await api.get(
      `/project_user/find-all-by-project-id/${campaignId}`,
      { token },
    );

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const schemaValidator = new SchemaValidatorAdapter(
      externalCollaboratorsSchema,
    );
    const externalCollaborators = schemaValidator.validate(
      apiResponse.response,
    );

    return new SearchResult({
      data: externalCollaborators.data.map((collaborator) =>
        Collaborator.restore({
          id: collaborator.id,
          projectId: collaborator.project_id,
          userId: collaborator.user_id,
          value: collaborator.value,
          roleId: collaborator.role_id,
          createdAt: collaborator.created_at,
          updatedAt: collaborator.updated_at,
          user: {
            name: collaborator.users.name,
            email: collaborator.users.email,
          },
        }),
      ),
      meta: {
        page: externalCollaborators.meta.currentPage,
        pageLimit: externalCollaborators.meta.itemsPerPage,
        totalItems: externalCollaborators.meta.totalItems,
      },
    });
  }
}

export { CollaboratorGateway };

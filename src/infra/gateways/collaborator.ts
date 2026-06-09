import type { CollaboratorSearchParams } from "~/app/search/collaboratorSearchParams";
import { SearchResult } from "~/app/shared/searchResult";
import type { Collaborator } from "~/domain/entities/collaborator";
import type { CollaboratorGatewayDTO } from "~/domain/gateways/collaborator";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { CollaboratorMapper } from "../mappers/collaborator";
import { listCollaboratorsSchema } from "../schemas/external/collaborator";
import type {
  DeleteCollaboratorType,
  UpdateCollaboratorType,
} from "../schemas/internal/collaborator";

class CollaboratorGateway implements CollaboratorGatewayDTO {
  async listCollaborators(
    searchParams: CollaboratorSearchParams,
  ): Promise<SearchResult<Collaborator>> {
    let url = "/organization-members/list-view";
    url += searchParams.toExternal();

    const apiResponse = await api.get(url);

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const schemaValidator = new SchemaValidatorAdapter(listCollaboratorsSchema);
    const externalCollaborators = schemaValidator.validate(
      apiResponse.response,
    );

    return new SearchResult({
      data: externalCollaborators.items.map(CollaboratorMapper.toEntity),
      meta: {
        page: externalCollaborators.page,
        pageLimit: externalCollaborators.pagesize,
        totalItems: externalCollaborators.total,
      },
    });
  }

  async updateCollaborator(body: UpdateCollaboratorType): Promise<void> {
    const apiResponse = await api.post("/organization-members/update", {
      body,
    });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }

  async deleteCollaborator(body: DeleteCollaboratorType): Promise<void> {
    const apiResponse = await api.delete(
      `/organization-members/delete/${body.id}`,
    );

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }
}

export { CollaboratorGateway };

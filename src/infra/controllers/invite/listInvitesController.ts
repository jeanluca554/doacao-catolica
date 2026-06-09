import { SearchParamsMapper } from "~/app/shared/searchParamsMapper";
import type { ListInvitesUseCase } from "~/app/useCases/invite/listInvitesUseCase";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { listInvitesSchema } from "~/infra/schemas/internal/collaborator";
import type { RouteDTO } from "~/main/types/route";

class ListInvitesController {
  constructor(private listInvitesUseCase: ListInvitesUseCase) {}

  async handle(route: RouteDTO) {
    const searchParams = SearchParamsMapper.toObject({
      query: route.query,
      params: route.params,
      scoped: "invites",
    });

    const schemaValidator = new SchemaValidatorAdapter(listInvitesSchema);

    const validatedParams = schemaValidator.validate(searchParams);

    const mappedFilter = SearchParamsMapper.toFilter(validatedParams);

    return await this.listInvitesUseCase.execute(mappedFilter);
  }
}

export { ListInvitesController };

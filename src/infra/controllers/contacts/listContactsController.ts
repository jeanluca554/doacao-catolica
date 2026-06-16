import { SearchParamsMapper } from "~/app/shared/searchParamsMapper";
import type { ListContactsUseCase } from "~/app/useCases/contacts/listContactsUseCase";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { listContactsSchema } from "~/infra/schemas/internal/contacts";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class ListContactsController {
  constructor(private listContactsUseCase: ListContactsUseCase) {}

  async handle(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) throw HttpAdapter.unauthorized("Unauthorized");

    const { campaignId } = route.params;
    if (!campaignId) throw HttpAdapter.badRequest("campaignId is required");

    const searchParams = SearchParamsMapper.toObject({
      query: route.query,
      params: route.params,
      scoped: "contacts",
    });

    const schemaValidator = new SchemaValidatorAdapter(listContactsSchema);
    const validatedParams = schemaValidator.validate(searchParams);
    const mappedFilter = SearchParamsMapper.toFilter(validatedParams);

    return await this.listContactsUseCase.execute(
      { campaignId, filter: mappedFilter.filter },
      user.token,
    );
  }
}

export { ListContactsController };

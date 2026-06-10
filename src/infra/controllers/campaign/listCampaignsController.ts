import { SearchParamsMapper } from "~/app/shared/searchParamsMapper";
import type { ListCampaignsUseCase } from "~/app/useCases/campaign/listCampaignsUseCase";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { listCampaignsSchema } from "~/infra/schemas/internal/campaign";
import type { RouteDTO } from "~/main/types/route";

class ListCampaignsController {
  constructor(private listCampaignsUseCase: ListCampaignsUseCase) {}

  async handle(route: RouteDTO) {
    const searchParams = SearchParamsMapper.toObject({
      query: route.query,
      params: route.params,
      scoped: "campaigns",
    });

    const schemaValidator = new SchemaValidatorAdapter(listCampaignsSchema);
    const validatedParams = schemaValidator.validate(searchParams);
    const mappedFilter = SearchParamsMapper.toFilter(validatedParams);

    return await this.listCampaignsUseCase.execute({
      page: mappedFilter.page,
      filter: {
        ...mappedFilter.filter,
      },
    });
  }
}

export { ListCampaignsController };

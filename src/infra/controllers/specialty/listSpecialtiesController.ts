import { SearchParamsMapper } from "~/app/shared/searchParamsMapper";
import type { ListSpecialtiesUseCase } from "~/app/useCases/specialty/listSpecialtiesUseCase";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { listSpecialtiesSchema } from "~/infra/schemas/internal/specialty";
import type { RouteDTO } from "~/main/types/route";

class ListSpecialtiesController {
  constructor(private listSpecialtiesUseCase: ListSpecialtiesUseCase) {}

  async handle(route: RouteDTO) {
    const searchParams = SearchParamsMapper.toObject({
      query: route.query,
      params: route.params,
      scoped: "specialties",
    });

    const schemaValidator = new SchemaValidatorAdapter(listSpecialtiesSchema);

    const validatedParams = schemaValidator.validate(searchParams);

    const mappedFilter = SearchParamsMapper.toFilter(validatedParams);

    return await this.listSpecialtiesUseCase.execute(mappedFilter);
  }
}

export { ListSpecialtiesController };

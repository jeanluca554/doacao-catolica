import { SearchParamsMapper } from "~/app/shared/searchParamsMapper";
import type { ListMedicationsUseCase } from "~/app/useCases/medication/listMedicationsUseCase";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { listMedicationsSchema } from "~/infra/schemas/internal/medication";
import type { RouteDTO } from "~/main/types/route";

class ListMedicationsController {
  constructor(private listMedicationsUseCase: ListMedicationsUseCase) {}

  async handle(route: RouteDTO) {
    const treatmentId = route.params.treatmentId;
    if (!treatmentId) throw HttpAdapter.badRequest("Treatment ID is required");

    const searchParams = SearchParamsMapper.toObject({
      query: route.query,
      params: route.params,
      scoped: "medications",
    });

    const schemaValidator = new SchemaValidatorAdapter(listMedicationsSchema);
    const validatedParams = schemaValidator.validate(searchParams);
    const mappedFilter = SearchParamsMapper.toFilter(validatedParams);

    return await this.listMedicationsUseCase.execute({
      page: mappedFilter.page,
      filter: {
        ...mappedFilter.filter,
        followUpId: treatmentId,
      },
    });
  }
}

export { ListMedicationsController };

import { SearchParamsMapper } from "~/app/shared/searchParamsMapper";
import type { ListPatientsUseCase } from "~/app/useCases/patient/listPatientsUseCase";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { listPatientsSchema } from "~/infra/schemas/internal/patient";
import type { RouteDTO } from "~/main/types/route";

class ListPatientsController {
  constructor(private listPatientsUseCase: ListPatientsUseCase) {}

  async handle(route: RouteDTO) {
    const workspaceId = route.params.workspaceId;
    if (!workspaceId) throw HttpAdapter.badRequest("Workspace ID is required");

    const searchParams = SearchParamsMapper.toObject({
      query: route.query,
      params: route.params,
      scoped: "patients",
    });

    const schemaValidator = new SchemaValidatorAdapter(listPatientsSchema);
    const validatedParams = schemaValidator.validate(searchParams);
    const mappedFilter = SearchParamsMapper.toFilter(validatedParams);

    return await this.listPatientsUseCase.execute({
      page: mappedFilter.page,
      filter: {
        ...mappedFilter.filter,
        organizationId: workspaceId,
      },
    });
  }
}

export { ListPatientsController };

import { SearchParamsMapper } from "~/app/shared/searchParamsMapper";
import type { ListCollaboratorsUseCase } from "~/app/useCases/collaborator/listCollaboratorsUseCase";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { listCollaboratorsSchema } from "~/infra/schemas/internal/collaborator";
import type { RouteDTO } from "~/main/types/route";

class ListCollaboratorsController {
  constructor(private listCollaboratorsUseCase: ListCollaboratorsUseCase) {}

  async handle(route: RouteDTO) {
    const searchParams = SearchParamsMapper.toObject({
      query: route.query,
      params: route.params,
      scoped: "collaborators",
    });

    const schemaValidator = new SchemaValidatorAdapter(listCollaboratorsSchema);

    const validatedParams = schemaValidator.validate(searchParams);

    const mappedFilter = SearchParamsMapper.toFilter(validatedParams);

    return await this.listCollaboratorsUseCase.execute(mappedFilter);
  }
}

export { ListCollaboratorsController };

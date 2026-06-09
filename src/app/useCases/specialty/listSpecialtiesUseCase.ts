import { SpecialtySearchParams } from "~/app/search/specialtiesSearchParams";
import type { SpecialtyGatewayDTO } from "~/domain/dal/specialty";

type InputProps = {
  filter?: { activityAreaId?: string };
};

class ListSpecialtiesUseCase {
  constructor(private specialtyGateway: SpecialtyGatewayDTO) {}

  async execute(input: InputProps) {
    const { filter } = input;
    const searchParams = new SpecialtySearchParams({ filter });
    const specialties =
      await this.specialtyGateway.listSpecialties(searchParams);

    return specialties.map((specialty) => specialty.toJson());
  }
}

export { ListSpecialtiesUseCase };

import { MedicationSearchParams } from "~/app/search/medicationSearchParams";
import type { MedicationGatewayDTO } from "~/domain/gateways/medication";

type InputProps = {
  page?: number | null;
  filter: {
    followUpId: string;
    active?: boolean;
    name?: string;
  };
};

class ListMedicationsUseCase {
  constructor(private medicationGateway: MedicationGatewayDTO) {}

  async execute(input: InputProps) {
    const { page, filter } = input;
    const searchParams = new MedicationSearchParams({ page, filter });

    const medications =
      await this.medicationGateway.listMedications(searchParams);

    return medications.toJson();
  }
}

export { ListMedicationsUseCase };

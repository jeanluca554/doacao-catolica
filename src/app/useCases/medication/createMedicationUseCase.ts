import type { MedicationGatewayDTO } from "~/domain/gateways/medication";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import type { CreateMedicationType } from "~/infra/schemas/internal/medication";

class CreateMedicationUseCase {
  constructor(private medicationGateway: MedicationGatewayDTO) {}

  async execute(props: CreateMedicationType, treatmentId: string) {
    await this.medicationGateway.createMedication(props, treatmentId);

    return HttpAdapter.created("Medicamento cadastrado com sucesso!");
  }
}

export { CreateMedicationUseCase };

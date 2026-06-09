import type { MedicationGatewayDTO } from "~/domain/gateways/medication";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import type { UpdateMedicationType } from "~/infra/schemas/internal/medication";

class UpdateMedicationUseCase {
  constructor(private medicationGateway: MedicationGatewayDTO) {}

  async execute(props: UpdateMedicationType, treatmentId: string) {
    await this.medicationGateway.updateMedication(props, treatmentId);

    return HttpAdapter.updated("Medicamento atualizado com sucesso!");
  }
}

export { UpdateMedicationUseCase };

import type { MedicationGatewayDTO } from "~/domain/gateways/medication";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import type { DeleteMedicationType } from "~/infra/schemas/internal/medication";

class DeleteMedicationUseCase {
  constructor(private medicationGateway: MedicationGatewayDTO) {}

  async execute(data: DeleteMedicationType) {
    await this.medicationGateway.deleteMedication(data);

    return HttpAdapter.success("Medicamento removido com sucesso!");
  }
}

export { DeleteMedicationUseCase };

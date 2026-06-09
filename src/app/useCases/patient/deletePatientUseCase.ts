import type { PatientGatewayDTO } from "~/domain/gateways/patient";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import type { DeletePatientType } from "~/infra/schemas/internal/patient";

class DeletePatientUseCase {
  constructor(private patientGateway: PatientGatewayDTO) {}

  async execute(data: DeletePatientType) {
    await this.patientGateway.deletePatient(data);
    return HttpAdapter.success("Paciente removido com sucesso!");
  }
}

export { DeletePatientUseCase };

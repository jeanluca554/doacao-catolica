import type { PatientGatewayDTO } from "~/domain/gateways/patient";

class ListPatientUseCase {
  constructor(private patientGateway: PatientGatewayDTO) {}

  async execute(id: string) {
    const patient = await this.patientGateway.listPatient(id);

    return patient.toJson();
  }
}

export { ListPatientUseCase };

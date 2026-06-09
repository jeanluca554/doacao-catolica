import type { PatientGatewayDTO } from "~/domain/gateways/patient";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { RedirectServerAdapter } from "~/infra/adapters/redirectServerAdapter";
import type { CreatePatientType } from "~/infra/schemas/internal/patient";

class CreatePatientUseCase {
  constructor(private patientGateway: PatientGatewayDTO) {}

  async execute(props: CreatePatientType, workspaceId: string) {
    await this.patientGateway.createPatient(props);
    throw RedirectServerAdapter.to(
      `/workspaces/${workspaceId}/patients?created=true`,
    );
  }
}

export { CreatePatientUseCase };

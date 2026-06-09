import type { PatientGatewayDTO } from "~/domain/gateways/patient";
import { RedirectServerAdapter } from "~/infra/adapters/redirectServerAdapter";
import type { UpdatePatientType } from "~/infra/schemas/internal/patient";

class UpdatePatientUseCase {
  constructor(private patientGateway: PatientGatewayDTO) {}

  async execute(props: UpdatePatientType, workspaceId: string) {
    await this.patientGateway.updatePatient(props);
    throw RedirectServerAdapter.to(
      `/workspaces/${workspaceId}/patients?updated=true`,
    );
  }
}

export { UpdatePatientUseCase };

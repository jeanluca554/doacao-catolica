import { PatientSearchParams } from "~/app/search/patientSearchParams";
import type { PatientGatewayDTO } from "~/domain/gateways/patient";

type InputProps = {
  page?: number | null;
  filter: { name?: string; organizationId?: string };
};

class ListPatientsUseCase {
  constructor(private patientGateway: PatientGatewayDTO) {}

  async execute(input: InputProps) {
    const { page, filter } = input;
    const searchParams = new PatientSearchParams({ page, filter });

    const patients = await this.patientGateway.listPatients(searchParams);

    return patients.toJson();
  }
}

export { ListPatientsUseCase };

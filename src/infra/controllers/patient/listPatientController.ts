import type { ListPatientUseCase } from "~/app/useCases/patient/listPatientUseCase";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import type { RouteDTO } from "~/main/types/route";

class ListPatientController {
  constructor(private listPatientUseCase: ListPatientUseCase) {}

  async handle(route: RouteDTO) {
    const patientId = route.params.patientId;
    if (!patientId) throw HttpAdapter.badRequest("Patient ID is required");

    return await this.listPatientUseCase.execute(patientId);
  }
}

export { ListPatientController };

import { ListPatientsUseCase } from "~/app/useCases/patient/listPatientsUseCase";
import { ListPatientsController } from "~/infra/controllers/patient/listPatientsController";
import { PatientGateway } from "~/infra/gateways/patient";

const patientGateway = new PatientGateway();
const listPatientsUseCase = new ListPatientsUseCase(patientGateway);
const listPatientsController = new ListPatientsController(listPatientsUseCase);

const listPatients = {
  handle: listPatientsController.handle.bind(listPatientsController),
};

export { listPatients };

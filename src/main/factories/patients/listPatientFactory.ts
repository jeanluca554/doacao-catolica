import { ListPatientUseCase } from "~/app/useCases/patient/listPatientUseCase";
import { ListPatientController } from "~/infra/controllers/patient/listPatientController";
import { PatientGateway } from "~/infra/gateways/patient";

const patientGateway = new PatientGateway();
const listPatientUseCase = new ListPatientUseCase(patientGateway);
const listPatientController = new ListPatientController(listPatientUseCase);

const listPatient = {
  handle: listPatientController.handle.bind(listPatientController),
};

export { listPatient };

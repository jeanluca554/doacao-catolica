import { DeletePatientUseCase } from "~/app/useCases/patient/deletePatientUseCase";
import { DeletePatientController } from "~/infra/controllers/patient/deletePatientController";
import { PatientGateway } from "~/infra/gateways/patient";

const patientGateway = new PatientGateway();
const deletePatientUseCase = new DeletePatientUseCase(patientGateway);
const deletePatientController = new DeletePatientController(
  deletePatientUseCase,
);

const deletePatient = {
  handle: deletePatientController.handle.bind(deletePatientController),
};

export { deletePatient };
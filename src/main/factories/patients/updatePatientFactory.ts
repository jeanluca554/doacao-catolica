import { UpdatePatientUseCase } from "~/app/useCases/patient/updatePatientUseCase";
import { UpdatePatientController } from "~/infra/controllers/patient/updatePatientController";
import { PatientGateway } from "~/infra/gateways/patient";

const patientGateway = new PatientGateway();
const updatePatientUseCase = new UpdatePatientUseCase(patientGateway);
const updatePatientController = new UpdatePatientController(
  updatePatientUseCase,
);

const updatePatient = {
  handle: updatePatientController.handle.bind(updatePatientController),
};

export { updatePatient };

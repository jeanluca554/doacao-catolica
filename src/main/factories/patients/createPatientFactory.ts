import { CreatePatientUseCase } from "~/app/useCases/patient/createPatientUseCase";
import { CreatePatientController } from "~/infra/controllers/patient/createPatientController";
import { PatientGateway } from "~/infra/gateways/patient";

const patientGateway = new PatientGateway();
const createPatientUseCase = new CreatePatientUseCase(patientGateway);
const createPatientController = new CreatePatientController(
  createPatientUseCase,
);

const createPatient = {
  handle: createPatientController.handle.bind(createPatientController),
};

export { createPatient };

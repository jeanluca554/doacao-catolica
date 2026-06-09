import { CreateMedicationUseCase } from "~/app/useCases/medication/createMedicationUseCase";
import { CreateMedicationController } from "~/infra/controllers/medication/createMedicationController";
import { MedicationGateway } from "~/infra/gateways/medication";

const medicationGateway = new MedicationGateway();
const createMedicationUseCase = new CreateMedicationUseCase(medicationGateway);
const createMedicationController = new CreateMedicationController(
  createMedicationUseCase,
);

const createMedication = {
  handle: createMedicationController.handle.bind(createMedicationController),
};

export { createMedication };
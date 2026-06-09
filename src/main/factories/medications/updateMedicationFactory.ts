import { UpdateMedicationUseCase } from "~/app/useCases/medication/updateMedicationUseCase";
import { UpdateMedicationController } from "~/infra/controllers/medication/updateMedicationController";
import { MedicationGateway } from "~/infra/gateways/medication";

const medicationGateway = new MedicationGateway();
const updateMedicationUseCase = new UpdateMedicationUseCase(medicationGateway);
const updateMedicationController = new UpdateMedicationController(
  updateMedicationUseCase,
);

const updateMedication = {
  handle: updateMedicationController.handle.bind(updateMedicationController),
};

export { updateMedication };

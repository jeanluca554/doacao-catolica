import { DeleteMedicationUseCase } from "~/app/useCases/medication/deleteMedicationUseCase";
import { DeleteMedicationController } from "~/infra/controllers/medication/deleteMedicationController";
import { MedicationGateway } from "~/infra/gateways/medication";

const medicationGateway = new MedicationGateway();
const deleteMedicationUseCase = new DeleteMedicationUseCase(medicationGateway);
const deleteMedicationController = new DeleteMedicationController(
  deleteMedicationUseCase,
);

const deleteMedication = {
  handle: deleteMedicationController.handle.bind(deleteMedicationController),
};

export { deleteMedication };

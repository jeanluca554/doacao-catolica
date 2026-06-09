import { ListMedicationsUseCase } from "~/app/useCases/medication/listMedicationsUseCase";
import { ListMedicationsController } from "~/infra/controllers/medication/listMedicationsController";
import { MedicationGateway } from "~/infra/gateways/medication";

const medicationGateway = new MedicationGateway();
const listMedicationsUseCase = new ListMedicationsUseCase(medicationGateway);
const listMedicationsController = new ListMedicationsController(
  listMedicationsUseCase,
);

const listMedications = {
  handle: listMedicationsController.handle.bind(listMedicationsController),
};

export { listMedications };
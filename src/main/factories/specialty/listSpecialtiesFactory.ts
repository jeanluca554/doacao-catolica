import { ListSpecialtiesUseCase } from "~/app/useCases/specialty/listSpecialtiesUseCase";
import { ListSpecialtiesController } from "~/infra/controllers/specialty/listSpecialtiesController";
import { SpecialtyGateway } from "~/infra/dal/specialty";

const specialtyGateway = new SpecialtyGateway();

const listSpecialtiesUseCase = new ListSpecialtiesUseCase(
  specialtyGateway,
);

const listSpecialtiesController = new ListSpecialtiesController(
  listSpecialtiesUseCase,
);

const listSpecialties = {
  handle: listSpecialtiesController.handle.bind(listSpecialtiesController),
};

export { listSpecialties };
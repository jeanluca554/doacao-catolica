import { ListBirthdayCelebrantsUseCase } from "~/app/useCases/birthdayCelebrant/listBirthdayCelebrantsUseCase";
import { ListBirthdayCelebrantsController } from "~/infra/controllers/birthdayCelebrant/listBirthdayCelebrantsController";
import { BirthdayCelebrantGateway } from "~/infra/gateways/birthdayCelebrant";

const gateway = new BirthdayCelebrantGateway();
const useCase = new ListBirthdayCelebrantsUseCase(gateway);
const controller = new ListBirthdayCelebrantsController(useCase);

const listBirthdayCelebrants = {
  handle: controller.handle.bind(controller),
};

export { listBirthdayCelebrants };

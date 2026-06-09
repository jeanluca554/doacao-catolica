import { ListActivityAreasUseCase } from "~/app/useCases/activityArea/listActivityAreasUseCase";
import { ListActivityAreasController } from "~/infra/controllers/activityArea/listActivityAreasController";
import { ActivityAreaDal } from "~/infra/dal/activityArea";

const activityAreaDal = new ActivityAreaDal();

const listActivityAreasUseCase = new ListActivityAreasUseCase(
  activityAreaDal,
);

const listActivityAreasController = new ListActivityAreasController(
  listActivityAreasUseCase,
);

const listActivityAreas = {
  handle: listActivityAreasController.handle.bind(listActivityAreasController),
};

export { listActivityAreas };

import type { ListActivityAreasUseCase } from "~/app/useCases/activityArea/listActivityAreasUseCase";

class ListActivityAreasController {
  constructor(private listActivityAreasUseCase: ListActivityAreasUseCase) {}

  async handle() {
    return await this.listActivityAreasUseCase.execute();
  }
}

export { ListActivityAreasController };

import type { ActivityAreaDalDTO } from "~/domain/dal/activityArea";

class ListActivityAreasUseCase {
  constructor(private activityAreaDal: ActivityAreaDalDTO) {}

  async execute() {
    const activityAreas = await this.activityAreaDal.listAll();
    return activityAreas.map((activityArea) => activityArea.toJson());
  }
}

export { ListActivityAreasUseCase };

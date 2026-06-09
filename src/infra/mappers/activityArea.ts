import { ActivityArea } from "~/domain/views/activityArea";
import type { ExternalActivityArea } from "../schemas/external/activityArea";

class ActivityAreaMapper {
  static toEntity(externalActivityArea: ExternalActivityArea) {
    return ActivityArea.restore({
      id: externalActivityArea.id,
      name: externalActivityArea.name,
    });
  }
}

export { ActivityAreaMapper };

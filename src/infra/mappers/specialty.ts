import { Specialty } from "~/domain/views/specialty";
import type { ExternalSpecialty } from "../schemas/external/specialty";

class SpecialtyMapper {
  static toEntity(externalSpecialty: ExternalSpecialty) {
    return Specialty.restore({
      id: externalSpecialty.id,
      name: externalSpecialty.name,
      activityAreaId: externalSpecialty.activityAreaId,
    });
  }
}

export { SpecialtyMapper };

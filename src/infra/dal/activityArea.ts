import type { ActivityAreaDalDTO } from "~/domain/dal/activityArea";
import type { ActivityArea } from "~/domain/views/activityArea";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { ActivityAreaMapper } from "../mappers/activityArea";
import { listActivityAreasSchema } from "../schemas/external/activityArea";

class ActivityAreaDal implements ActivityAreaDalDTO {
  async listAll(): Promise<ActivityArea[]> {
    const url = "/activity-area/list";

    const apiResponse = await api.get(url);

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const schemaValidator = new SchemaValidatorAdapter(listActivityAreasSchema);
    const externalActivityAreas = schemaValidator.validate(
      apiResponse.response,
    );

    return externalActivityAreas.map(ActivityAreaMapper.toEntity);
  }
}

export { ActivityAreaDal };

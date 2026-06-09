import type { SpecialtySearchParams } from "~/app/search/specialtiesSearchParams";
import type { Specialty } from "~/domain/views/specialty";
import type { SpecialtyGatewayDTO } from "~/domain/dal/specialty";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { SpecialtyMapper } from "../mappers/specialty";
import { listSpecialtiesSchema } from "../schemas/external/specialty";

class SpecialtyGateway implements SpecialtyGatewayDTO {
  async listSpecialties(
    searchParams: SpecialtySearchParams,
  ): Promise<Specialty[]> {
    const url = "/specialty/list" + searchParams.toExternal();

    const apiResponse = await api.get(url);

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const schemaValidator = new SchemaValidatorAdapter(listSpecialtiesSchema);
    const externalSpecialties = schemaValidator.validate(apiResponse.response);

    return externalSpecialties.map(SpecialtyMapper.toEntity);
  }
}

export { SpecialtyGateway };

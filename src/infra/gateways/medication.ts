import type { MedicationSearchParams } from "~/app/search/medicationSearchParams";
import { SearchResult } from "~/app/shared/searchResult";
import type { Medication } from "~/domain/entities/medication";
import type { MedicationGatewayDTO } from "~/domain/gateways/medication";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { MedicationMapper } from "../mappers/medication";
import type {
  CreateMedicationType,
  DeleteMedicationType,
  UpdateMedicationType,
} from "../schemas/internal/medication";
import { listMedicationsSchema } from "../schemas/external/medication";

class MedicationGateway implements MedicationGatewayDTO {
  async listMedications(
    searchParams: MedicationSearchParams,
  ): Promise<SearchResult<Medication>> {
    let url = "/medications/list";
    url += searchParams.toExternal();

    const apiResponse = await api.get(url);

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const schemaValidator = new SchemaValidatorAdapter(listMedicationsSchema);
    const externalMedications = schemaValidator.validate(apiResponse.response);

    return new SearchResult({
      data: externalMedications.items.map(MedicationMapper.toEntity),
      meta: {
        page: externalMedications.page,
        pageLimit: externalMedications.pagesize,
        totalItems: externalMedications.total,
      },
    });
  }

  async createMedication(
    body: CreateMedicationType,
    treatmentId: string,
  ): Promise<void> {
    const apiResponse = await api.post("/medications", {
      body: {
        ...body,
        followUpId: treatmentId,
        active: true,
      },
    });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }

  async updateMedication(
    body: UpdateMedicationType,
    treatmentId: string,
  ): Promise<void> {
    const apiResponse = await api.put("/medications", {
      body: {
        ...body,
        followUpId: treatmentId,
      },
    });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }

  async deleteMedication(body: DeleteMedicationType): Promise<void> {
    const apiResponse = await api.delete(`/medications/${body.id}`);

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }
}

export { MedicationGateway };

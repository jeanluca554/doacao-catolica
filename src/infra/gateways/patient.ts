import { SearchResult } from "~/app/shared/searchResult";
import type { PatientSearchParams } from "~/app/search/patientSearchParams";
import type { Patient } from "~/domain/entities/patient";
import type { PatientGatewayDTO } from "~/domain/gateways/patient";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { PatientMapper } from "../mappers/patient";
import {
  externalPatientSchema,
  listPatientsSchema,
} from "../schemas/external/patient";
import type {
  CreatePatientType,
  DeletePatientType,
  UpdatePatientType,
} from "../schemas/internal/patient";

class PatientGateway implements PatientGatewayDTO {
  async listPatients(
    searchParams: PatientSearchParams,
  ): Promise<SearchResult<Patient>> {
    let url = "/patients/list";
    url += searchParams.toExternal();

    const apiResponse = await api.get(url);

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const schemaValidator = new SchemaValidatorAdapter(listPatientsSchema);
    const externalPatients = schemaValidator.validate(apiResponse.response);

    return new SearchResult({
      data: externalPatients.items.map(PatientMapper.toEntity),
      meta: {
        page: externalPatients.page,
        pageLimit: externalPatients.pagesize,
        totalItems: externalPatients.total,
      },
    });
  }

  async listPatient(id: string): Promise<Patient> {
    const apiResponse = await api.get(`/patients/${id}`);

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const schemaValidator = new SchemaValidatorAdapter(externalPatientSchema);
    const externalPatient = schemaValidator.validate(apiResponse.response);

    return PatientMapper.toEntity(externalPatient);
  }

  async createPatient(body: CreatePatientType): Promise<void> {
    const apiResponse = await api.post("/patients", { body });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }

  async updatePatient(body: UpdatePatientType): Promise<void> {
    const apiResponse = await api.put("/patients", { body });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }

  async deletePatient(body: DeletePatientType): Promise<void> {
    const apiResponse = await api.delete(`/patients/${body.id}`);

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);
  }
}

export { PatientGateway };

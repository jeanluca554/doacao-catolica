import type { PatientSearchParams } from "~/app/search/patientSearchParams";
import { SearchResult } from "~/app/shared/searchResult";
import type { Patient } from "../entities/patient";
import type {
  CreatePatientType,
  UpdatePatientType,
  DeletePatientType,
} from "~/infra/schemas/internal/patient";

type PatientGatewayDTO = {
  listPatients: (
    searchParams: PatientSearchParams,
  ) => Promise<SearchResult<Patient>>;
  listPatient: (id: string) => Promise<Patient>;
  createPatient: (data: CreatePatientType) => Promise<void>;
  updatePatient: (data: UpdatePatientType) => Promise<void>;
  deletePatient: (data: DeletePatientType) => Promise<void>;
};

export type { PatientGatewayDTO };

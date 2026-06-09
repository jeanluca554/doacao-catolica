import type { MedicationSearchParams } from "~/app/search/medicationSearchParams";
import { SearchResult } from "~/app/shared/searchResult";
import type { Medication } from "~/domain/entities/medication";
import type {
  CreateMedicationType,
  DeleteMedicationType,
  UpdateMedicationType,
} from "~/infra/schemas/internal/medication";

type MedicationGatewayDTO = {
  listMedications: (
    searchParams: MedicationSearchParams,
  ) => Promise<SearchResult<Medication>>;
  createMedication: (
    props: CreateMedicationType,
    treatmentId: string,
  ) => Promise<void>;
  updateMedication: (
    props: UpdateMedicationType,
    treatmentId: string,
  ) => Promise<void>;
  deleteMedication: (props: DeleteMedicationType) => Promise<void>;
};

export type { MedicationGatewayDTO };

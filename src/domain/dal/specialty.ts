import type { SpecialtySearchParams } from "~/app/search/specialtiesSearchParams";
import type { Specialty } from "../views/specialty";

type SpecialtyGatewayDTO = {
  listSpecialties: (
    searchParams: SpecialtySearchParams,
  ) => Promise<Specialty[]>;
};

export type { SpecialtyGatewayDTO };

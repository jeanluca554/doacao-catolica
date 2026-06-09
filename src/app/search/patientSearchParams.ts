import { SearchParams } from "../shared/searchParams";

type Filter = {
  name?: string;
  organizationId?: string;
};

class PatientSearchParams extends SearchParams<Filter> {}

export { PatientSearchParams };

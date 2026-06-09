import { SearchParams } from "../shared/searchParams";

type Filter = {
  followUpId?: string;
  active?: boolean;
  name?: string;
};

const MEDICATIONS_PAGE_SIZE_ALL = 100;

class MedicationSearchParams extends SearchParams<Filter> {
  constructor(props?: ConstructorParameters<typeof SearchParams<Filter>>[0]) {
    super(props);
    this.pageLimit = MEDICATIONS_PAGE_SIZE_ALL;
  }
}

export { MedicationSearchParams };

import { SearchParams } from "../shared/searchParams";

type Filter = {
  activityAreaId?: string;
};

class SpecialtySearchParams extends SearchParams<Filter> {}

export { SpecialtySearchParams };

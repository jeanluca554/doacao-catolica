import { SearchParams } from "../shared/searchParams";

type Filter = {
  name?: string;
};

class CollaboratorSearchParams extends SearchParams<Filter> {}

export { CollaboratorSearchParams };

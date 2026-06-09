import { SearchParams } from "../shared/searchParams";

type Filter = {
  status?: string;
};

class InviteSearchParams extends SearchParams<Filter> {
  constructor(any: any) {
    super(any);

    if (this.filter) {
      this.filter.status = "PENDING_AND_REFUSED";
    }
  }
}

export { InviteSearchParams };

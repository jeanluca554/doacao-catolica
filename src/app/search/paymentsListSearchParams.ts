import { SearchParams } from "../shared/searchParams";

type Filter = {
  start_date: string;
  end_date: string;
  per_page: number;
};

class PaymentsListSearchParams extends SearchParams<Filter> {}

export { PaymentsListSearchParams };

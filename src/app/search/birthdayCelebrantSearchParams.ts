import { SearchParams } from "../shared/searchParams";

type BirthdayCelebrantFilter = {
  search?: string;
  "filter[day]"?: string;
  "filter[month]"?: string;
  "filter[project_id]": string;
};

type BirthdayCelebrantSearchParamsProps = {
  page?: string;
  filter: BirthdayCelebrantFilter;
};

class BirthdayCelebrantSearchParams extends SearchParams<BirthdayCelebrantFilter> {
  private readonly externalPage?: string;
  private readonly externalFilter: BirthdayCelebrantFilter;

  constructor(props: BirthdayCelebrantSearchParamsProps) {
    super({
      page: props.page ? Number(props.page) : 1,
      filter: props.filter,
    });

    this.externalPage = props.page;
    this.externalFilter = props.filter;
  }

  toExternal() {
    const params = new URLSearchParams();

    if (this.externalPage) params.set("page", this.externalPage);

    for (const [key, value] of Object.entries(this.externalFilter)) {
      if (value) params.set(key, value);
    }

    const query = params.toString();
    return query ? `?${query}` : "";
  }
}

export { BirthdayCelebrantSearchParams };

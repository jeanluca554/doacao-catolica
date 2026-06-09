import type { RouteDTO } from "../../main/types/route";

type ToObjectInputProps = {
  params: RouteDTO["params"];
  query: RouteDTO["query"];
  scoped: string;
};

type PaginationFields = {
  page?: number;
  pageLimit?: number;
  sort?: string;
  sortDirection?: "asc" | "desc";
};

class SearchParamsMapper {
  static toObject(input: ToObjectInputProps) {
    const { params, query, scoped } = input;
    if (!scoped) return { ...params, ...query };

    const scopedQuery = Object.fromEntries(
      Object.entries(query)
        .filter(([key]) => key.startsWith(`${scoped}:`))
        .map(([key, value]) => [key.replace(`${scoped}:`, ""), value])
    );

    return { ...params, ...scopedQuery };
  }

  static toFilter<T extends Record<string, any>>(
    input: T & Partial<PaginationFields>
  ): {
    page?: number;
    pageLimit?: number;
    sort?: string;
    sortDirection?: "asc" | "desc";
    filter: Omit<T, keyof PaginationFields>;
  } {
    const whiteList = ["page", "pageLimit", "sort", "sortDirection"];
    const filter = {} as Omit<T, keyof PaginationFields>;

    Object.entries(input).forEach(([key, value]) => {
      if (!whiteList.includes(key)) (filter as any)[key] = value;
    });

    return {
      page: input?.page,
      pageLimit: input?.pageLimit,
      sort: input?.sort,
      sortDirection: input?.sortDirection,
      filter,
    };
  }
}

export { SearchParamsMapper };

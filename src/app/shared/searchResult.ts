import type { Entity } from "../../domain/protocol/entity";

type MetaType = {
  page: number;
  pageLimit: number;
  totalItems: number;
};

type SearchResultConstructorProps<E extends Entity> = {
  data: E[];
  meta: MetaType;
};

class SearchResult<E extends Entity> {
  readonly data: E[];
  readonly meta: MetaType;

  constructor(props: SearchResultConstructorProps<E>) {
    this.data = props.data;
    this.meta = props.meta;
  }

  toJson() {
    return {
      data: this.data.map((entity) => entity.toJson()) as ReturnType<
        E["toJson"]
      >[],
      meta: {
        page: this.meta.page,
        pageLimit: this.meta.pageLimit,
        totalItems: this.meta.totalItems,
        totalPages: Math.ceil(this.meta.totalItems / this.meta.pageLimit),
      },
    };
  }
}

export { SearchResult };

import type { BirthdayCelebrantSearchParams } from "~/app/search/birthdayCelebrantSearchParams";
import type { BirthdayCelebrant } from "../entities/birthdayCelebrant";

type BirthdayCelebrantsResult = {
  data: BirthdayCelebrant[];
  meta: {
    currentPage: number;
    totalItems: number;
    totalPages: number;
  };
};

type BirthdayCelebrantGatewayDTO = {
  findAll(
    token: string,
    filters: BirthdayCelebrantSearchParams,
  ): Promise<BirthdayCelebrantsResult>;
};

export type { BirthdayCelebrantGatewayDTO, BirthdayCelebrantsResult };

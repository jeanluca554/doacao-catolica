import { BirthdayCelebrantSearchParams } from "~/app/search/birthdayCelebrantSearchParams";
import type { BirthdayCelebrantGatewayDTO } from "~/domain/gateways/birthdayCelebrant";

type InputProps = {
  token: string;
  campaignId: string;
  page?: string;
  search?: string;
  day?: string;
  month?: string;
};

class ListBirthdayCelebrantsUseCase {
  constructor(private gateway: BirthdayCelebrantGatewayDTO) {}

  async execute(input: InputProps) {
    const filters = new BirthdayCelebrantSearchParams({
      page: input.page,
      filter: {
        search: input.search,
        "filter[day]": input.day,
        "filter[month]": input.month,
        "filter[project_id]": input.campaignId,
      },
    });

    const response = await this.gateway.findAll(input.token, filters);

    return {
      data: response.data.map((celebrant) => celebrant.toJson()),
      meta: response.meta,
    };
  }
}

export { ListBirthdayCelebrantsUseCase };

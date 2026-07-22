import type { BirthdayCelebrantSearchParams } from "~/app/search/birthdayCelebrantSearchParams";
import type {
  BirthdayCelebrantGatewayDTO,
  BirthdayCelebrantsResult,
} from "~/domain/gateways/birthdayCelebrant";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { BirthdayCelebrantMapper } from "../mappers/birthdayCelebrant";
import { externalBirthdayCelebrantsSchema } from "../schemas/external/birthdayCelebrant";

class BirthdayCelebrantGateway implements BirthdayCelebrantGatewayDTO {
  async findAll(
    token: string,
    filters: BirthdayCelebrantSearchParams,
  ): Promise<BirthdayCelebrantsResult> {
    let url = "/contact/find-by-birth-date";
    url += filters.toExternal();

    const apiResponse = await api.get(url, { token });

    if (!apiResponse.success) {
      throw HttpAdapter.badRequest(
        apiResponse.message,
        apiResponse.response,
      );
    }

    const validator = new SchemaValidatorAdapter(
      externalBirthdayCelebrantsSchema,
    );
    const response = validator.validate(apiResponse.response);

    return {
      data: response.items.map(BirthdayCelebrantMapper.toEntity),
      meta: {
        currentPage: response.current_page,
        totalItems: response.total,
        totalPages: response.last_page,
      },
    };
  }
}

export { BirthdayCelebrantGateway };

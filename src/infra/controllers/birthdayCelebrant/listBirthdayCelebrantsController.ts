import type { ListBirthdayCelebrantsUseCase } from "~/app/useCases/birthdayCelebrant/listBirthdayCelebrantsUseCase";
import { redirect } from "react-router";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class ListBirthdayCelebrantsController {
  constructor(private useCase: ListBirthdayCelebrantsUseCase) {}

  async handle(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) throw redirect("/sign-in");

    const { campaignId } = route.params;
    if (!campaignId) {
      throw HttpAdapter.badRequest("projectPublicId is required");
    }

    return await this.useCase.execute({
      token: user.token,
      campaignId,
      page: route.query.page,
      search: route.query.search,
      day: route.query["filter[day]"],
      month: route.query["filter[month]"],
    });
  }
}

export { ListBirthdayCelebrantsController };

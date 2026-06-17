import type { FindOneContactUseCase } from "~/app/useCases/contacts/findOneContactUseCase";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class FindOneContactController {
  constructor(private findOneContactUseCase: FindOneContactUseCase) {}

  async handle(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) throw HttpAdapter.unauthorized("Unauthorized");

    const contactPublicId = route.query.contactPublicId;
    if (!contactPublicId)
      throw HttpAdapter.badRequest("contactPublicId is required");

    return await this.findOneContactUseCase.execute(
      contactPublicId,
      user.token,
    );
  }
}

export { FindOneContactController };

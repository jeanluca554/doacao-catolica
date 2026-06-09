import type { ValidateUserUseCase } from "~/app/useCases/user/validateUserUseCase";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { RedirectServerAdapter } from "~/infra/adapters/redirectServerAdapter";
import type { RouteDTO } from "~/main/types/route";

class ValidateUserController {
  constructor(private validateUserUseCase: ValidateUserUseCase) {}

  async handle(route: RouteDTO) {
    const token = route.params?.token;
    if (!token) throw HttpAdapter.notFound("Token not found");

    await this.validateUserUseCase.execute(token);
    return RedirectServerAdapter.to("/sign-in");
  }
}

export { ValidateUserController };

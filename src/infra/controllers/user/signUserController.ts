import type { SignUserUseCase } from "~/app/useCases/user/signUserUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { signUserSchema } from "~/infra/schemas/internal/user";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class SignUserController {
  constructor(private signUserUseCase: SignUserUseCase) {}

  async handle(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);

    const schemaValidator = new SchemaValidatorAdapter(signUserSchema);
    const data = schemaValidator.validate(body);
    const [user, token] = await this.signUserUseCase.execute(data);

    return await AuthService.setAuthStorage(
      route,
      {
        avatar: user.avatar,
        email: user.email,
        id: user.id,
        name: user.name,
        token,
      },
      "/choose-workspace",
    );
  }
}

export { SignUserController };

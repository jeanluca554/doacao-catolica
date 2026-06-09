import type { CreateUserUseCase } from "~/app/useCases/user/createUserUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { RedirectServerAdapter } from "~/infra/adapters/redirectServerAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { createUserSchema } from "~/infra/schemas/internal/user";
import type { RouteDTO } from "~/main/types/route";

class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);

    const utm: Record<string, string> = {};
    Object.entries(route.query).map(([key, value]) => {
      if (key.includes("utm_")) utm[key] = value;
    });

    const avatar =
      body?.avatar || `https://ui-avatars.com/api/?name=${body?.name}`;

    const schemaValidator = new SchemaValidatorAdapter(createUserSchema);
    const data = schemaValidator.validate({ ...body, avatar, utm });
    await this.createUserUseCase.execute(data);

    const encodedEmail = encodeURIComponent(data.email);

    return RedirectServerAdapter.to(`/verify-email/${encodedEmail}`);
  }
}

export { CreateUserController };

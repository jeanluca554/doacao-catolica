import type { AcceptInviteUseCase } from "~/app/useCases/invite/acceptInviteUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { acceptInviteSchema } from "~/infra/schemas/internal/collaborator";
import type { RouteDTO } from "~/main/types/route";

class AcceptInviteController {
  constructor(private acceptInviteUseCase: AcceptInviteUseCase) {}

  async handle(route: RouteDTO) {
    const body = await DecodeRequestBodyAdapter.decode(route.request);
    const token = route.params.token;

    if (!token) {
      throw HttpAdapter.badRequest("Token do convite não informado");
    }

    const schemaValidator = new SchemaValidatorAdapter(acceptInviteSchema);
    const validatedBody = schemaValidator.validate(body);

    return await this.acceptInviteUseCase.execute(validatedBody, token);
  }
}

export { AcceptInviteController };

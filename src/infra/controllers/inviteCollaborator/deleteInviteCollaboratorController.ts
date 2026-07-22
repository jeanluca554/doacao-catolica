import type { DeleteInviteCollaboratorUseCase } from "~/app/useCases/inviteCollaborator/deleteInviteCollaboratorUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { deleteInviteCollaboratorSchema } from "~/infra/schemas/internal/inviteCollaborator";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class DeleteInviteCollaboratorController {
  constructor(
    private deleteInviteCollaboratorUseCase: DeleteInviteCollaboratorUseCase,
  ) {}

  async handle(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) throw HttpAdapter.unauthorized("Unauthorized");

    const body = await DecodeRequestBodyAdapter.decode(route.request);
    const validated = new SchemaValidatorAdapter(
      deleteInviteCollaboratorSchema,
    ).validate(body);

    await this.deleteInviteCollaboratorUseCase.execute(
      validated.Id,
      user.token,
    );

    return {
      toast: {
        message: "Acesso removido com sucesso!",
        type: "success" as const,
      },
    };
  }
}

export { DeleteInviteCollaboratorController };

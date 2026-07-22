import type { UpdateInviteCollaboratorUseCase } from "~/app/useCases/inviteCollaborator/updateInviteCollaboratorUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import {
  deleteInviteCollaboratorSchema,
  updateInviteCollaboratorSchema,
} from "~/infra/schemas/internal/inviteCollaborator";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class UpdateInviteCollaboratorController {
  constructor(
    private updateInviteCollaboratorUseCase: UpdateInviteCollaboratorUseCase,
  ) {}

  async handle(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) throw HttpAdapter.unauthorized("Unauthorized");

    const body = await DecodeRequestBodyAdapter.decode(route.request);
    const validatedUpdate = new SchemaValidatorAdapter(
      updateInviteCollaboratorSchema,
    ).validate(body);
    const validatedId = new SchemaValidatorAdapter(
      deleteInviteCollaboratorSchema,
    ).validate(body);

    await this.updateInviteCollaboratorUseCase.execute(
      {
        id: validatedId.Id,
        roleId: validatedUpdate.roleId,
      },
      user.token,
    );

    return {
      toast: {
        message: "Função atualizada com sucesso!",
        type: "success" as const,
      },
    };
  }
}

export { UpdateInviteCollaboratorController };

import type { CreateInviteCollaboratorUseCase } from "~/app/useCases/inviteCollaborator/createInviteCollaboratorUseCase";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { createInviteCollaboratorSchema } from "~/infra/schemas/internal/inviteCollaborator";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class CreateInviteCollaboratorController {
  constructor(
    private createInviteCollaboratorUseCase: CreateInviteCollaboratorUseCase,
  ) {}

  async handle(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) throw HttpAdapter.unauthorized("Unauthorized");

    const { campaignId } = route.params;
    if (!campaignId) throw HttpAdapter.badRequest("campaignId is required");

    const inviterId = Number(user.id);
    if (!Number.isInteger(inviterId)) {
      throw HttpAdapter.badRequest("inviter_id must be a number");
    }

    const body = await DecodeRequestBodyAdapter.decode(route.request);
    const validated = new SchemaValidatorAdapter(
      createInviteCollaboratorSchema,
    ).validate(body);

    await this.createInviteCollaboratorUseCase.execute(
      {
        projectId: campaignId,
        inviterId,
        invitedUserEmail: validated.userEmail,
        invitedUserRoleId: validated.roleId,
      },
      user.token,
    );

    return {
      toast: {
        message: "Convite enviado com sucesso!",
        type: "success" as const,
      },
    };
  }
}

export { CreateInviteCollaboratorController };

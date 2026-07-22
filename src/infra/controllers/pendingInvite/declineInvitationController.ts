import type { DeclineInvitationUseCase } from "~/app/useCases/pendingInvite/declineInvitationUseCase";
import { redirect } from "react-router";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { declineInvitationSchema } from "~/infra/schemas/internal/pendingInvite";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class DeclineInvitationController {
  constructor(private useCase: DeclineInvitationUseCase) {}

  async handle(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) throw redirect("/sign-in");

    const body = await DecodeRequestBodyAdapter.decode(route.request);
    const input = new SchemaValidatorAdapter(
      declineInvitationSchema,
    ).validate(body);

    await this.useCase.execute(input.id, user.token);

    return {
      closeModalKey: "decline-invite-modal",
      toast: {
        title: "Sucesso!",
        message: "Convite recusado com sucesso!",
        type: "success" as const,
      },
    };
  }
}

export { DeclineInvitationController };

import type { AcceptInvitationUseCase } from "~/app/useCases/pendingInvite/acceptInvitationUseCase";
import { redirect } from "react-router";
import { DecodeRequestBodyAdapter } from "~/infra/adapters/decodeRequestBodyAdapter";
import { SchemaValidatorAdapter } from "~/infra/adapters/schemaValidatorAdapter";
import { acceptInvitationSchema } from "~/infra/schemas/internal/pendingInvite";
import { AuthService } from "~/infra/services/authService";
import type { RouteDTO } from "~/main/types/route";

class AcceptInvitationController {
  constructor(private useCase: AcceptInvitationUseCase) {}

  async handle(route: RouteDTO) {
    const user = await AuthService.getAuthStorage(route);
    if (!user) throw redirect("/sign-in");

    const body = await DecodeRequestBodyAdapter.decode(route.request);
    const input = new SchemaValidatorAdapter(
      acceptInvitationSchema,
    ).validate(body);

    await this.useCase.execute(
      {
        userEmail: user.email,
        projectId: input.projectId,
        roleId: input.roleId,
      },
      user.token,
    );

    const params = new URLSearchParams({
      confirmationInviteParam: "true",
      invitedEmail: user.email,
    });

    return redirect(`/pending-invites?${params.toString()}`);
  }
}

export { AcceptInvitationController };

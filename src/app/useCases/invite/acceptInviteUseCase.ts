import { redirect } from "react-router";
import type { InviteGatewayDTO } from "~/domain/gateways/invite";
import type { AcceptInviteType } from "~/infra/schemas/internal/collaborator";

class AcceptInviteUseCase {
  constructor(private inviteGateway: InviteGatewayDTO) {}

  async execute(body: AcceptInviteType, token: string) {
    await this.inviteGateway.acceptInvite(body, token);
    return redirect("/choose-workspace");
  }
}

export { AcceptInviteUseCase };

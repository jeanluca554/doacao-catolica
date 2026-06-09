import { InviteSearchParams } from "~/app/search/inviteSearchParams";
import type { InviteGatewayDTO } from "~/domain/gateways/invite";

type InputProps = {
  page?: number | null;
  filter: { status?: string };
};

class ListInvitesUseCase {
  constructor(private inviteGateway: InviteGatewayDTO) {}

  async execute(input: InputProps) {
    const { page, filter } = input;
    const searchParams = new InviteSearchParams({ page, filter });
    const invites = await this.inviteGateway.listInvites(searchParams);

    return invites.toJson();
  }
}

export { ListInvitesUseCase };

import type { Route } from "+/pendingCollaborators";
import { InvitesTable } from "~/client/pages/collaborators/components/collaboratorsTable";
import { TabContentWrapper } from "~/client/pages/collaborators/styles";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { listInvites } from "../factories/invite/listInvitesFactory";
import { listRoles } from "../factories/role/listRolesFactory";

export async function loader(args: Route.LoaderArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(args);

  const [invites, roles] = await Promise.all([
    listInvites.handle(adaptedRoute),
    listRoles.handle(),
  ]);

  return {
    invites,
    roles,
  };
}

export default function CollaboratorsPendingRoute() {
  return (
    <TabContentWrapper className="fade-in">
      <InvitesTable />
    </TabContentWrapper>
  );
}

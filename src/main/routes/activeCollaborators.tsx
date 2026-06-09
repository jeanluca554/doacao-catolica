import type { Route } from "+/activeCollaborators";
import { CollaboratorsTable } from "~/client/pages/collaborators/components/collaboratorsTable";
import { TabContentWrapper } from "~/client/pages/collaborators/styles";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { listCollaborators } from "../factories/collaborators/listCollaboratorsFactory";

export async function loader(args: Route.LoaderArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(args);

  const collaborators = await listCollaborators.handle(adaptedRoute);

  return {
    collaborators,
  };
}

export default function CollaboratorsActivesRoute() {
  return (
    <TabContentWrapper className="fade-in">
      <CollaboratorsTable />
    </TabContentWrapper>
  );
}

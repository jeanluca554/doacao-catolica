import type { Route } from "+/route.collaborators";
import { CollaboratorsPage } from "~/client/pages/collaborators";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";
import { DecodeActionAdapter } from "~/infra/adapters/decodeAction";
import { ErrorHandlerAdapter } from "~/infra/adapters/errorHandlerAdapter";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { deleteInvite } from "~/main/factories/invite/deleteInviteFactory";
import { deleteCollaborator } from "../factories/collaborators/deleteCollaboratorFactory";
import { createInvite } from "../factories/invite/createInviteFactory";
import { listActivityAreas } from "../factories/activityArea/listActivityAreasFactory";
import { listCollaborators } from "../factories/collaborators/listCollaboratorsFactory";
import { listInvites } from "../factories/invite/listInvitesFactory";
import { listRoles } from "../factories/role/listRolesFactory";
import { listSpecialties } from "../factories/specialty/listSpecialtiesFactory";
import { updateCollaborator } from "../factories/collaborators/updateCollaboratorFactory";
import { updateInvite } from "../factories/invite/updateInviteFactory";

export async function loader(args: Route.LoaderArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(args);

  const [collaborators, invites, roles, activityAreas, specialties] =
    await Promise.all([
      listCollaborators.handle(adaptedRoute),
      listInvites.handle(adaptedRoute),
      listRoles.handle(),
      listActivityAreas.handle(),
      listSpecialties.handle(adaptedRoute),
    ]);

  return {
    collaborators,
    invites,
    roles,
    activityAreas,
    specialties,
  };
}

export async function action(args: Route.ActionArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(args);
  const _action = await DecodeActionAdapter.decode(adaptedRoute.request);

  try {
    switch (_action) {
      case "createInvite":
        return await createInvite.handle(adaptedRoute);
      case "updateInvite":
        return await updateInvite.handle(adaptedRoute);
      case "updateCollaborator":
        return await updateCollaborator.handle(adaptedRoute);
      case "deleteCollaborator":
        return await deleteCollaborator.handle(adaptedRoute);
      case "deleteInvite":
        return await deleteInvite.handle(adaptedRoute);
      default:
        throw HttpAdapter.notImplemented("Action not implemented");
    }
  } catch (error) {
    return ErrorHandlerAdapter.handle(error);
  }
}

export function ErrorBoundary() {
  return <ErrorBoundaryPage />;
}

export default function HomeRoute() {
  return <CollaboratorsPage />;
}

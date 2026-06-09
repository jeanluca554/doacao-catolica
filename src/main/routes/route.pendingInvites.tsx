import type { Route } from "+/route.pendingInvites";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";
import { PendingInvitesPage } from "~/client/pages/pendingInvites";
import { DecodeActionAdapter } from "~/infra/adapters/decodeAction";
import { ErrorHandlerAdapter } from "~/infra/adapters/errorHandlerAdapter";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { PendingInviteMapper } from "~/infra/mappers/pendingInvite";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { PendingInviteService } from "~/infra/services/pendingInviteService";
import { acceptInvite } from "../factories/invite/acceptInviteFactory";

export function meta() {
  return [{ title: `InovaMed | Convites Pendentes` }];
}

export async function loader(args: Route.LoaderArgs) {
  const pendingInvite = PendingInviteService.parseToken(args.params.token);
  return PendingInviteMapper.toLoaderData(pendingInvite);
}

export async function action(props: Route.ActionArgs) {
  try {
    const adaptedRoute = await RouteAdapter.adaptRoute(props);
    const _action = await DecodeActionAdapter.decode(adaptedRoute.request);

    switch (_action) {
      case "respondInvite":
        return await acceptInvite.handle(adaptedRoute);
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

export default function PendingInvitesRoute() {
  return <PendingInvitesPage />;
}

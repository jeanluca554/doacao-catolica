import type { Route } from "+/api.authGoogle";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { authGoogleUser } from "../factories/auth/authGoogleUserFactory";

export async function action(props: Route.ActionArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(props);
  return await authGoogleUser.handle(adaptedRoute);
}

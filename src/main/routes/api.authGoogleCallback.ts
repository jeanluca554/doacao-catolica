import type { Route } from "+/api.authGoogleCallback";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { authGoogleCallbackUser } from "../factories/auth/authGoogleCallbackUserFactory";

export async function loader(props: Route.LoaderArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(props);
  return await authGoogleCallbackUser.handle(adaptedRoute);
}

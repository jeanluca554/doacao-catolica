import type { Route } from "+/route.signIn";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";
import { SignInPage } from "~/client/pages/signIn";
import { ErrorHandlerAdapter } from "~/infra/adapters/errorHandlerAdapter";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { signUser } from "../factories/user/signUserFactory";

export function meta(props: Route.MetaArgs) {
  return [{ title: `InovaMed | Faça seu login` }];
}

export async function action(props: Route.ActionArgs) {
  try {
    const adaptedRoute = await RouteAdapter.adaptRoute(props);
    return await signUser.handle(adaptedRoute);
  } catch (error) {
    return ErrorHandlerAdapter.handle(error);
  }
}

export function ErrorBoundary() {
  return <ErrorBoundaryPage />;
}

export default function SignInRoute() {
  return <SignInPage />;
}

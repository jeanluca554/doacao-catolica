import type { Route } from "+/route.verifyEmail";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";
import { VerifyEmailPage } from "~/client/pages/verifyEmail";
import { ErrorHandlerAdapter } from "~/infra/adapters/errorHandlerAdapter";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { signUser } from "../factories/user/signUserFactory";

export function meta(props: Route.MetaArgs) {
  return [{ title: `InovaMed | Verifique seu e-mail` }];
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

export default function VerifyEmailRoute() {
  return <VerifyEmailPage />;
}

import type { Route } from "+/route.changeForgotPassword";
import { ChangeForgotPasswordPage } from "~/client/pages/changeForgotPassword";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";
import { ErrorHandlerAdapter } from "~/infra/adapters/errorHandlerAdapter";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { changeForgotPassword } from "../factories/user/changeForgotPasswordFactory";

export function meta(props: Route.MetaArgs) {
  return [{ title: `InovaMed | Alterar senha` }];
}

export async function action(props: Route.ActionArgs) {
  try {
    const adaptedRoute = await RouteAdapter.adaptRoute(props);
    return await changeForgotPassword.handle(adaptedRoute);
  } catch (error) {
    return ErrorHandlerAdapter.handle(error);
  }
}

export function ErrorBoundary() {
  return <ErrorBoundaryPage />;
}

export default function ChangeForgotPasswordRoute() {
  return <ChangeForgotPasswordPage />;
}

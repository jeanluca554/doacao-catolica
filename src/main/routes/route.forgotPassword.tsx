import type { Route } from "+/route.forgotPassword";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";
import { ForgotPasswordPage } from "~/client/pages/forgotPassword";
import { ErrorHandlerAdapter } from "~/infra/adapters/errorHandlerAdapter";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { forgotPassword } from "../factories/user/forgotPasswordFactory";

export function meta(props: Route.MetaArgs) {
  return [{ title: `InovaMed | Esqueci minha senha` }];
}

export async function action(props: Route.ActionArgs) {
  try {
    const adaptedRoute = await RouteAdapter.adaptRoute(props);
    return await forgotPassword.handle(adaptedRoute);
  } catch (error) {
    return ErrorHandlerAdapter.handle(error);
  }
}

export function ErrorBoundary() {
  return <ErrorBoundaryPage />;
}

export default function ForgotPasswordRoute() {
  return <ForgotPasswordPage />;
}

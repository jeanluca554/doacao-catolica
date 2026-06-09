import type { Route } from "+/route.signUp";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";
import { SignUpPage } from "~/client/pages/signUp";
import { ErrorHandlerAdapter } from "~/infra/adapters/errorHandlerAdapter";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { createUser } from "../factories/user/createUserFactory";

export function meta(props: Route.MetaArgs) {
  return [{ title: `InovaMed | Crie sua conta` }];
}

export async function action(props: Route.ActionArgs) {
  try {
    const adaptedRoute = await RouteAdapter.adaptRoute(props);
    return await createUser.handle(adaptedRoute);
  } catch (error) {
    return ErrorHandlerAdapter.handle(error);
  }
}

export function ErrorBoundary() {
  return <ErrorBoundaryPage />;
}

export default function SignUpRoute() {
  return <SignUpPage />;
}

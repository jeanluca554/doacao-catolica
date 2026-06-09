import type { Route } from "+/route.chooseWorkspace";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";
import { ChooseWorkspacePage } from "~/client/pages/chooseWorkspace";
import { ErrorHandlerAdapter } from "~/infra/adapters/errorHandlerAdapter";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { createWorkspace } from "../factories/workspace/createCustomerFactory";
import { listWorkspaces } from "../factories/workspace/listCustomersFactory";

export function meta(props: Route.MetaArgs) {
  return [{ title: `InovaMed | Selecione um espaço de trabalho` }];
}

export async function action(args: Route.ActionArgs) {
  try {
    const adaptedRoute = await RouteAdapter.adaptRoute(args);
    return await createWorkspace.handle(adaptedRoute);
  } catch (error) {
    return ErrorHandlerAdapter.handle(error);
  }
}

export async function loader(args: Route.LoaderArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(args);
  const workspaces = await listWorkspaces.handle(adaptedRoute);
  return { workspaces };
}

export function ErrorBoundary() {
  return <ErrorBoundaryPage />;
}

export default function WorkspacesRoute() {
  return <ChooseWorkspacePage />;
}

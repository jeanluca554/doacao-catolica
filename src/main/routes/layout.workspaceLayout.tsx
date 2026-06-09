import type { Route } from "+/layout.workspaceLayout";
import { WorkspaceLayout } from "~/client/layouts/workspaceLayout";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { AuthMiddleware } from "../middlewares/authMiddleware";
import { listWorkspaces } from "../factories/workspace/listCustomersFactory";

export async function loader(args: Route.LoaderArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(args);
  const user = await AuthMiddleware.authenticate(adaptedRoute);
  const workspaces = await listWorkspaces.handle(adaptedRoute);
  return { user, workspaces };
}

export function ErrorBoundary() {
  return <ErrorBoundaryPage />;
}

export default WorkspaceLayout;

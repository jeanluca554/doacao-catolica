import type { Route } from "+/route.myCampaigns";
import { MyCampaignsPage } from "~/client/pages/myCampaigns";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { listCampaigns } from "../factories/campaing/listCampaingsFactory";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";

export async function loader(args: Route.LoaderArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(args);

  const campaigns = await listCampaigns.handle(adaptedRoute);

  return { campaigns };
}

// export async function action(args: Route.ActionArgs) {
//   const adaptedRoute = await RouteAdapter.adaptRoute(args);
//   const _action = await DecodeActionAdapter.decode(adaptedRoute.request);

//   try {
//     switch (_action) {
//       case "deletePatient":
//         return await deletePatient.handle(adaptedRoute);
//       default:
//         throw HttpAdapter.notImplemented("Action not implemented");
//     }
//   } catch (error) {
//     return ErrorHandlerAdapter.handle(error);
//   }
// }

export function ErrorBoundary() {
  return <ErrorBoundaryPage />;
}

export default function TestPage() {
  return <MyCampaignsPage />;
}

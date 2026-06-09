import type { Route } from "+/route.patientUpdate";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";
import { EditPatientPage } from "~/client/pages/patientUpdate";
import { DecodeActionAdapter } from "~/infra/adapters/decodeAction";
import { ErrorHandlerAdapter } from "~/infra/adapters/errorHandlerAdapter";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { listPatient } from "../factories/patients/listPatientFactory";
import { updatePatient } from "../factories/patients/updatePatientFactory";

export async function loader(args: Route.LoaderArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(args);

  const patient = await listPatient.handle(adaptedRoute);

  return { patient };
}

export async function action(args: Route.ActionArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(args);
  const _action = await DecodeActionAdapter.decode(adaptedRoute.request);

  try {
    switch (_action) {
      case "updatePatient":
        return await updatePatient.handle(adaptedRoute);
      default:
        throw HttpAdapter.notImplemented("Action not implemented");
    }
  } catch (error) {
    return ErrorHandlerAdapter.handle(error);
  }
}

export function ErrorBoundary() {
  return <ErrorBoundaryPage />;
}

export default function HomeRoute() {
  return <EditPatientPage />;
}

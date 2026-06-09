import type { Route } from "+/route.patients";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";
import { PatientsPage } from "~/client/pages/patients";
import { DecodeActionAdapter } from "~/infra/adapters/decodeAction";
import { ErrorHandlerAdapter } from "~/infra/adapters/errorHandlerAdapter";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { deletePatient } from "../factories/patients/deletePatientFactory";
import { listPatients } from "../factories/patients/listPatientsFactory";

export async function loader(args: Route.LoaderArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(args);

  const patients = await listPatients.handle(adaptedRoute);

  return { patients };
}

export async function action(args: Route.ActionArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(args);
  const _action = await DecodeActionAdapter.decode(adaptedRoute.request);

  try {
    switch (_action) {
      case "deletePatient":
        return await deletePatient.handle(adaptedRoute);
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
  return <PatientsPage />;
}

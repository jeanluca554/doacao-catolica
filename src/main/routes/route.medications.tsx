import type { Route } from "+/route.medications";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";
import { MedicationsPage } from "~/client/pages/medications";
import { DecodeActionAdapter } from "~/infra/adapters/decodeAction";
import { ErrorHandlerAdapter } from "~/infra/adapters/errorHandlerAdapter";
import { HttpAdapter } from "~/infra/adapters/httpAdapter";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { deleteMedication } from "~/main/factories/medications/deleteMedicationFactory";
import { createMedication } from "../factories/medications/createMedicationFactory";
import { listMedications } from "../factories/medications/listMedicationsFactory";
import { updateMedication } from "../factories/medications/updateMedicationFactory";

export async function loader(args: Route.LoaderArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(args);

  const medications = await listMedications.handle(adaptedRoute);

  return { medications };
}

export async function action(args: Route.ActionArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(args);
  const _action = await DecodeActionAdapter.decode(adaptedRoute.request);

  try {
    switch (_action) {
      case "createMedications":
        return await createMedication.handle(adaptedRoute);
      case "updateMedications":
        return await updateMedication.handle(adaptedRoute);
      case "deleteMedication":
        return await deleteMedication.handle(adaptedRoute);
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
  return <MedicationsPage />;
}

import type { Route } from "+/route.campaign.birthdayReport";
import { BirthdayReportPage } from "~/client/pages/birthdayReport";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";
import { RouteAdapter } from "~/infra/adapters/routeAdapter";
import { listBirthdayCelebrants } from "../factories/birthdayCelebrant/listBirthdayCelebrantsFactory";

export async function loader(args: Route.LoaderArgs) {
  const adaptedRoute = await RouteAdapter.adaptRoute(args);
  const birthdayCelebrants =
    await listBirthdayCelebrants.handle(adaptedRoute);

  return { birthdayCelebrants };
}

export function ErrorBoundary() {
  return <ErrorBoundaryPage />;
}

export default function BirthdayReportRoute() {
  return <BirthdayReportPage />;
}

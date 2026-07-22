import { CampaignPreferencesPage } from "~/client/pages/campaignPreferences";
import { ErrorBoundaryPage } from "~/client/pages/errorBoundary";

export function ErrorBoundary() {
  return <ErrorBoundaryPage />;
}

export default function CampaignPreferencesRoute() {
  return <CampaignPreferencesPage />;
}

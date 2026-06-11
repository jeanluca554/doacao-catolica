import { Outlet } from "react-router";
import { CampaignBanner } from "./components/campaignBanner";
import { Sidebar } from "./components/sidebar";

function CampaignLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-auto">
        <CampaignBanner />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export { CampaignLayout };

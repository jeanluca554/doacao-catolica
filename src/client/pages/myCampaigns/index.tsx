import { Header } from "./components/header";
import { TableCard } from "./components/table";

function MyCampaignsPage() {
  return (
    <div className="flex w-full flex-col gap-8 p-6 sm:p-8">
      <Header />
      <TableCard />
    </div>
  );
}

export { MyCampaignsPage };

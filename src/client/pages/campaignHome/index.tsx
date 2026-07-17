import { useLoaderData, useParams, useRouteLoaderData } from "react-router";
import type { loader } from "~/main/routes/route.campaign.home";
import type { CampaignLayoutLoader } from "~/client/types/campaignLayoutLoader";
import { KpiCards } from "./kpi-cards";
import { DonationEvolutionCard } from "./donation-evolution-card";
import { CampaignGoalCard } from "./campaign-goal-card";
import { RecentDonationsCard } from "./recent-donations-card";
import { TopDonorsCard } from "./top-donors-card";
import { PaymentMethodsCard } from "./payment-methods-card";
import { DonorProfileCard } from "./donor-profile-card";
import { ConversionFunnelCard } from "./conversion-funnel-card";
import { DonationBracketsCard } from "./donation-brackets-card";
import { MonthlyRecurrenceCard } from "./monthly-recurrence-card";
import { ChannelPerformanceCard } from "./channel-performance-card";

function CampaignHomePage() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const id = campaignId ?? "";

  const overview = useLoaderData<typeof loader>();
  const layoutData = useRouteLoaderData<CampaignLayoutLoader>(
    "main/routes/layout.campaignLayout",
  );

  const rawGoal = layoutData?.campaign.totalGoal;
  const totalGoal: number | null =
    rawGoal != null && rawGoal !== "" ? Number(rawGoal) : null;

  const totalGoalProgressPercentage =
    overview.totalGoalProgressPercentage ??
    (totalGoal && totalGoal > 0
      ? (overview.totalRaised / totalGoal) * 100
      : null);

  const totalGoalRemaining =
    overview.totalGoalRemaining ??
    (totalGoal !== null ? totalGoal - overview.totalRaised : null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-(--text-heading)">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe o desempenho desta campanha em tempo real.
        </p>
      </div>

      <KpiCards
        totalRaised={overview.totalRaised}
        supporters={overview.supporters}
        newSupportersLast7Days={overview.newSupportersLast7Days}
        totalGoal={totalGoal}
        totalGoalProgressPercentage={totalGoalProgressPercentage}
        averageTicketMonth={overview.averageTicketMonth}
        averageTicketVariationPercentage={
          overview.averageTicketVariationPercentage
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <DonationEvolutionCard />
        <CampaignGoalCard
          totalRaised={overview.totalRaised}
          totalGoal={totalGoal}
          totalGoalProgressPercentage={totalGoalProgressPercentage}
          totalGoalRemaining={totalGoalRemaining}
          growthPercentage={overview.growthPercentage}
          oneTimeCustomers={overview.oneTimeCustomers}
          recurringCustomers={overview.recurringCustomers}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
        <RecentDonationsCard campaignId={id} />
        <TopDonorsCard campaignId={id} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PaymentMethodsCard />
        <DonorProfileCard />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ConversionFunnelCard />
        <DonationBracketsCard />
      </div>

      <MonthlyRecurrenceCard />

      <ChannelPerformanceCard />
    </div>
  );
}

export { CampaignHomePage };

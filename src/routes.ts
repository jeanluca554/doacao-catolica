import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  index("./main/routes/_index.ts"),
  
  route("api/logout-user", "./main/routes/api.logoutUser.ts"),
  route("api/file-upload", "./main/routes/api.fileUpload.ts"),
  route("api/auth/token", "./main/routes/api.authToken.ts"),
  
  layout("./main/routes/layout.appLayout.tsx", [
    route("my-campaigns", "./main/routes/route.myCampaigns.tsx"),
    route("pending-invites", "./main/routes/route.pendingInvites.tsx"),
    route("campaigns-groups", "./main/routes/route.campaignsGroups.tsx"),
  ]),

  route("campaign/:campaignId", "./main/routes/layout.campaignLayout.tsx", [
    route("home", "./main/routes/route.campaign.home.tsx"),
    route("notifications", "./main/routes/route.campaign.notifications.tsx"),
    route("donations", "./main/routes/route.campaign.donations.tsx"),
    route("transfers", "./main/routes/route.campaign.transfers.tsx"),
    route("reports", "./main/routes/route.campaign.reports.tsx"),
    route(
      "birthday-report",
      "./main/routes/route.campaign.birthdayReport.tsx",
    ),
    route(
      "overdue-payments",
      "./main/routes/route.campaign.overduePayments.tsx",
    ),
    route("collaborators", "./main/routes/route.campaign.collaborators.tsx"),
    route("create-recurrence", "./main/routes/route.campaign.createRecurrence.tsx"),
    route("create-one-time-payment", "./main/routes/route.campaign.createOneTimePayment.tsx"),
    route("settings/payment-methods", "./main/routes/route.campaign.paymentMethods.tsx"),
  ]),

] satisfies RouteConfig;

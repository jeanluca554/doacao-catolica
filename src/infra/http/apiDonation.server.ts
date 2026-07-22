import { ApiService } from "@arkyn/server";
import { environmentVariables } from "~/main/config/environmentVariables";

const apiDonation = new ApiService({
  baseUrl: environmentVariables.API_URL_DONATION,
  enableDebug: process.env.NODE_ENV === "development",
});

export { apiDonation };

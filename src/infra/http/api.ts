import { ApiService } from "@arkyn/server";
import { environmentVariables } from "~/main/config/environmentVariables";

const api = new ApiService({
  baseUrl: `${environmentVariables.API_URL}`,
  enableDebug: process.env.NODE_ENV === "development",
});

export { api };

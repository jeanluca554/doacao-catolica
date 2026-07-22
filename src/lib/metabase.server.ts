import jwt from "jsonwebtoken";
import { environmentVariables } from "~/main/config/environmentVariables";

const METABASE_DASHBOARD_ID = 71;
const TOKEN_EXPIRATION_SECONDS = 600;

function createOverduePaymentsIframeUrl(
  projectPublicId: string,
  monthQuantity: number,
) {
  const payload = {
    resource: {
      dashboard: METABASE_DASHBOARD_ID,
    },
    params: {
      project_id: projectPublicId,
      x_meses: monthQuantity,
    },
    exp: Math.round(Date.now() / 1000) + TOKEN_EXPIRATION_SECONDS,
  };

  const token = jwt.sign(
    payload,
    environmentVariables.METABASE_SECRET_KEY,
  );

  return `${environmentVariables.METABASE_API}/embed/dashboard/${token}#bordered=true&titled=true`;
}

export { createOverduePaymentsIframeUrl };

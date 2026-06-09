import { useMatches } from "react-router";
import type { TreatmentLoader } from "../types/treatmentLoader";

function useTreatment() {
  const matches = useMatches();

  const matchUrl = "main/routes/layout.treatmentLayout";
  const match = matches.find((m) => m.id === matchUrl);
  const data = match?.loaderData as TreatmentLoader;

  if (data) return data;

  throw new Error("Treatment layout match not found");
}

export { useTreatment };

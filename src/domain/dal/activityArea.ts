import type { ActivityArea } from "../views/activityArea";

type ActivityAreaDalDTO = {
  listAll: () => Promise<ActivityArea[]>;
};

export type { ActivityAreaDalDTO };

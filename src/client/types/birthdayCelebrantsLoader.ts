import type { loader } from "~/main/routes/route.campaign.birthdayReport";

type BirthdayCelebrantsLoader = Awaited<ReturnType<typeof loader>>;

export type { BirthdayCelebrantsLoader };

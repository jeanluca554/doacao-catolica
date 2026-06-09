import { loader } from "~/root";

type RootLoaderType = Awaited<ReturnType<typeof loader>>;

export type { RootLoaderType };

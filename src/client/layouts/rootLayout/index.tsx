import type { ReactNode } from "react";

import { ProgressBar } from "~/client/components/progressBar";

import { RootDocument } from "./components/rootDocument";
import { RootProviders } from "./components/rootProviders";

import { rootLinks } from "./meta/links";
import { rootMeta } from "./meta/meta";

type RootLayoutProps = {
  children: ReactNode;
};

function RootLayout({ children }: RootLayoutProps) {
  return (
    <RootProviders>
      <RootDocument>
        <ProgressBar />
        {children}
      </RootDocument>
    </RootProviders>
  );
}

export { RootLayout, rootLinks, rootMeta };

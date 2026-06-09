import { Links, Meta, Scripts, ScrollRestoration } from "react-router";
import type { ReactNode } from "react";

import { RootDocumentContainer } from "./styles";

import "@arkyn/components/dist/style.css";
// import "~/client/themes/reset.css";
import "~/client/themes/tailwind.css";

type RootDocument = {
  children: ReactNode;
};

function RootDocument({ children }: RootDocument) {
  return (
    <html lang="pt-br" className="lightBlue">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>

      <RootDocumentContainer>
        {children}
        <ScrollRestoration />
        <Scripts />
      </RootDocumentContainer>
    </html>
  );
}

export { RootDocument };

import {
  DrawerProvider,
  ModalProvider,
  ToastProvider,
} from "@arkyn/components";
import type { ReactNode } from "react";

type RootProviderArgs = {
  children: ReactNode;
};

function RootProviders({ children }: RootProviderArgs) {
  return (
    <ToastProvider>
      <DrawerProvider>
        <ModalProvider>{children}</ModalProvider>
      </DrawerProvider>
    </ToastProvider>
  );
}

export { RootProviders };

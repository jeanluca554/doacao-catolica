import type { ReactNode } from "react";
import { Container } from "./styles";

type StickyContentProps = {
  children: ReactNode;
};

function StickyContent(props: StickyContentProps) {
  return <Container>{props.children}</Container>;
}

export { StickyContent };

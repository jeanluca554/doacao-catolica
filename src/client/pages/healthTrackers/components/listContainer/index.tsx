import type { ReactNode } from "react";
import { Container } from "./styles";

type ListContainerProps = {
  children: ReactNode;
};

function ListContainer({ children }: ListContainerProps) {
  return <Container>{children}</Container>;
}

export { ListContainer };

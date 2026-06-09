import { styled } from "@linaria/react";
import { screenBreakpoints } from "~/client/themes/screenBreakpoints";

const Container = styled.div`
  > section {
    display: flex;
  }

  > .arkynDrawerContainer {
    display: none;
  }

  ${screenBreakpoints.md} {
    > .arkynDrawerContainer {
      display: unset;

      section {
        border-right: none;
      }
    }

    > section {
      display: none;
    }
  }
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  height: 100%;

  background: var(--background-foreground);
  border-right: 1px solid var(--border);
`;

export { Container, Content };

import { styled } from "@linaria/react";
import { screenBreakpoints } from "~/client/themes/screenBreakpoints";

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h1 {
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: var(--text-heading);
  }

  .arkynIconButton {
    display: none;
  }

  ${screenBreakpoints.xxs} {
    .arkynButton {
      display: none;
    }

    .arkynIconButton {
      display: block;
    }
  }
`;

export { Container };

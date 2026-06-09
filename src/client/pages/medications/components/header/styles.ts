import { styled } from "@linaria/react";
import { screenBreakpoints } from "~/client/themes/screenBreakpoints";

const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  h1 {
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: var(--text-heading);
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .arkynIconButton {
    display: none;
  }

  ${screenBreakpoints.xxs} {
    .arkynButton {
      display: none;
    }

    .actions {
      .arkynIconButton {
        display: block;
      }
    }
  }
`;

export { Container };

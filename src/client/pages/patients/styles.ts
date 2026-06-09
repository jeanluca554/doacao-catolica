import { styled } from "@linaria/react";
import { screenBreakpoints } from "~/client/themes/screenBreakpoints";

const Container = styled.main`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 32px;
  padding: 32px;

  ${screenBreakpoints.sm} {
    padding: 24px;
  }

  ${screenBreakpoints.xxs} {
    padding: 16px;
  }
`;

export { Container };

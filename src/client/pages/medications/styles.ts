import { styled } from "@linaria/react";
import { screenBreakpoints } from "~/client/themes/screenBreakpoints";

const Container = styled.main`
  display: flex;
  width: 100%;
  max-width: 1336px;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  margin: 0 auto;

  .searchContainer {
    max-width: 360px;
  }

  ${screenBreakpoints.xxs} {
    padding: 20px;
  }
`;

const TabContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  transition: opacity 0.15s ease-in-out;

  &.fade-out {
    opacity: 0;
  }

  &.fade-in {
    opacity: 1;
  }
`;

export { Container, TabContentWrapper };

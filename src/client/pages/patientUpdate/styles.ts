import { styled } from "@linaria/react";
import { screenBreakpoints } from "~/client/themes/screenBreakpoints";

const Container = styled.main`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 32px;
  padding: 32px;

  .formContent {
    display: flex;
    flex-direction: column;
    gap: 32px;

    .updatePatientButton {
      align-self: flex-end;
      max-width: min-content;
    }
  }

  ${screenBreakpoints.sm} {
    padding: 24px;
    .formContent {
      gap: 24px;
    }
  }

  ${screenBreakpoints.xxs} {
    padding: 16px;
    .formContent {
      .updatePatientButton {
        min-width: 100%;
      }
    }
  }
`;

export { Container };

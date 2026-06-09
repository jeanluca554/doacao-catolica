import { styled } from "@linaria/react";
import { screenBreakpoints } from "~/client/themes/screenBreakpoints";

const Container = styled.div`
  border: solid 1px var(--border);
  border-radius: 8px;
  background-color: var(--background-foreground);

  padding: 32px;

  display: flex;
  gap: 20px;

  .registerForm {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 680px;

    gap: 24px;

    h1 {
      font-size: 16px;
      font-weight: 600;
      line-height: 24px;
    }

    .postalCode {
      max-width: 230px;
    }

    .formRowHalf {
      display: flex;
      gap: 16px;

      .arkynFieldWrapper {
        flex: 1;
      }
    }

    .formRow70-30 {
      display: flex;
      gap: 16px;

      .arkynFieldWrapper {
        &:first-child {
          flex: 0.7;
        }

        &:last-child {
          flex: 0.3;
        }
      }
    }

    .formRow60-40 {
      display: flex;
      gap: 16px;

      .arkynFieldWrapper {
        &:first-child {
          flex: 0.6;
        }

        &:last-child {
          flex: 0.4;
        }
      }
    }

    .formRow3Equal {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 16px;
    }
  }

  ${screenBreakpoints.sm} {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 24px;

    .registerForm {
      max-width: 100%;
    }
  }

  ${screenBreakpoints.xxs} {
    padding: 16px;

    .registerForm {
      gap: 20px;

      .postalCode {
        max-width: 100%;
      }

      .formRowHalf,
      .formRow70-30,
      .formRow60-40,
      .formRow3Equal {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }
    }
  }
`;

export { Container };

import { styled } from "@linaria/react";
import { screenBreakpoints } from "~/client/themes/screenBreakpoints";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px;
  gap: 24px;
  width: 760px;

  label {
    color: var(--text-heading);
  }

  .arkynInput {
    background: var(--card);
  }

  .arkynSelectContainer {
    background: var(--card);
  }

  .status {
    display: flex;
    align-items: center;
    width: 140px;
    gap: 10px;
  }

  .borderRole {
    border: 1px solid var(--border);
    border-radius: 6px;
    padding: 16px;

    .arkynFieldWrapper {
      gap: 20px;
    }

    .arkynRadioGroup {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .arkynRadioBox {
        margin-right: auto;
        align-items: flex-start;
        gap: 8px;

        .radioBoxContent {
          display: flex;
          flex-direction: column;
          gap: 4px;

          strong {
            font-size: 14px;
            font-weight: 600;
            line-height: 20px;
            text-align: left;
            color: var(--text-heading);
          }

          p {
            font-size: 14px;
            font-weight: 400;
            line-height: 20px;
            text-align: left;
            color: var(--text-body);
          }
        }
      }
    }
  }

  .registerProfessional {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .registerForm {
    display: flex;
    gap: 16px;
  }

  .professionalFields {
    display: flex;
    flex-direction: column;
    gap: 16px;

    width: 100%;
  }

  ${screenBreakpoints.sm} {
    max-width: calc(100vw - 20px);

    .registerForm {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
`;

export { ModalContent };

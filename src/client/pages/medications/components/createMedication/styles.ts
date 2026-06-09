import { styled } from "@linaria/react";
import { screenBreakpoints } from "~/client/themes/screenBreakpoints";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px;
  gap: 24px;
  width: 485px;

  label {
    color: var(--text-heading);
  }

  .inputGroup {
    display: flex;
    gap: 16px;

    .arkynFieldWrapper {
      width: 100%;
    }
  }

  .arkynInput {
    background: var(--card);
  }

  .instructionContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;

    padding: 16px;
    border-radius: 6px;
    background: var(--card-foreground-primary);

    > p {
      color: var(--text-heading);
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
    }
  }

  .instructionActions {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  ${screenBreakpoints.xxs} {
    max-width: calc(100vw - 20px);

    .inputGroup {
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .instructionContainer {
      flex-direction: column;
      align-items: flex-start;
    }

    .instructionActions {
      width: 100%;
      justify-content: space-between;
    }
  }
`;

export { ModalContent };

import { styled } from "@linaria/react";
import { screenBreakpoints } from "~/client/themes/screenBreakpoints";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  min-width: 528px;
  max-width: 690px;
  padding: 20px;
  gap: 24px;

  strong {
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0%;

    color: var(--text-heading);
  }

  p {
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 0%;
    text-align: center;

    color: var(--text-muted);

    margin-top: 6px;
  }

  ${screenBreakpoints.sm} {
    min-width: calc(100vw - 40px);
    max-width: calc(100vw - 40px);
  }

  ${screenBreakpoints.xs} {
    min-width: calc(100vw - 20px);
    max-width: calc(100vw - 20px);
  }
`;

export { ModalContent };

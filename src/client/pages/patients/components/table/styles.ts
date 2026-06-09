import { styled } from "@linaria/react";
import { Form } from "react-router";
import { screenBreakpoints } from "~/client/themes/screenBreakpoints";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;
  padding: 32px;

  border: solid 1px var(--border);
  border-radius: 8px;
  background-color: var(--background-foreground);

  .avatarName {
    display: flex;
    align-items: center;
    gap: 12px;

    min-width: 200px;
  }

  ${screenBreakpoints.sm} {
    padding: 24px;
    .avatarName {
      min-width: 200px;
    }
  }

  ${screenBreakpoints.xxs} {
    padding: 16px;
  }
`;

const CaptionContainer = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;

  > :first-child {
    min-width: 480px;
  }

  > :last-child {
    min-width: 208px;
  }
`;

const FooterContainer = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;

  p {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    color: var(--text-muted);
  }

  @media (max-width: 500px) {
    flex-direction: column;
    justify-content: center;
    gap: 24px;

    p {
      text-align: center;
    }
  }
`;

const CentralizedTh = styled.th`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CentralizedTd = styled.td`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
  CaptionContainer,
  CentralizedTd,
  CentralizedTh,
  Container,
  FooterContainer,
};

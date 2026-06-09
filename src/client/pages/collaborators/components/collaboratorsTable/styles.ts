import { styled } from "@linaria/react";
import { Form } from "react-router";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  gap: 24px;
  padding: 32px;

  border: solid 1px var(--border);
  border-radius: 8px;
  background-color: var(--background-foreground);
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
  Container,
  FooterContainer,
  CentralizedTh,
  CentralizedTd,
};

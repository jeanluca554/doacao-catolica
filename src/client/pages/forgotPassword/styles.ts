import { styled } from "@linaria/react";
import { Form } from "react-router";

const PageContainer = styled.section`
  display: flex;
  flex-direction: column;

  width: 538px;
  padding: 24px;
  gap: 12px;

  .headerContainer {
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 8px;
    margin-bottom: 48px;

    strong {
      font-weight: 600;
      font-size: 24px;
      color: var(--text-heading);
      text-align: center;
    }

    p {
      font-weight: 400;
      font-size: 18px;
      color: var(--text-muted);
      text-align: center;
      line-height: 130%;
    }
  }

  @media (max-width: 500px) {
    width: 100vw;
    padding: 16px;
    gap: 6px;
  }
`;

const FormContainer = styled(Form)`
  display: flex;
  flex-direction: column;

  gap: 12px;

  > a {
    font-size: 14px;
    font-weight: 400;
    line-height: 19.07px;

    margin-top: -6px;
    margin-left: auto;

    text-decoration: none;
    color: rgb(var(--spotlight-primary));

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }

  .formErrorMessage {
    font-size: 12px;
    line-height: 12px;
    font-weight: 600;
    color: rgb(var(--spotlight-danger), 1);
  }
`;

const NavigateContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin-top: 28px;

  p {
    font-weight: 400;
    font-size: 14px;
    color: var(--text-body);
  }

  a {
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    color: rgb(var(--spotlight-primary));

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export { PageContainer, FormContainer, NavigateContainer };

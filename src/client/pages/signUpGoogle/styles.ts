import { styled } from "@linaria/react";

const PageContainer = styled.section`
  display: flex;
  flex-direction: column;

  width: 538px;
  padding: 24px;
  gap: 24px;

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

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;

  .formErrorMessage {
    font-size: 12px;
    line-height: 12px;
    font-weight: 600;
    color: rgb(var(--spotlight-danger), 1);
  }

  .arkynButton {
    margin-top: 12px;
  }
`;

export { FormContainer, PageContainer };

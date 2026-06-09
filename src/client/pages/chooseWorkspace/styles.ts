import { styled } from "@linaria/react";
import { Form } from "react-router";

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
    margin-bottom: 24px;

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

const ListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;

  li,
  button {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 20px;

    border: 1px solid var(--border);
    border-radius: 8px;
    outline: 1px solid transparent;

    img {
      width: 40px;
      height: 40px;
      border-radius: 8px;
    }

    strong {
      font-weight: 600;
      font-size: 16px;
      line-height: 28px;
      letter-spacing: 0%;
      color: var(--text-heading);
    }

    > svg {
      margin-left: auto;
    }

    &:hover,
    &.active {
      cursor: pointer;
      background-color: rgba(var(--spotlight-primary), 0.05);
      border-color: rgb(var(--spotlight-primary));
      outline-color: rgba(var(--spotlight-primary));
    }

    &.active {
      cursor: not-allowed;
    }
  }

  button {
    background-color: transparent;

    .plusCircle {
      display: flex;
      align-items: center;
      justify-content: center;

      width: 40px;
      height: 40px;

      border-radius: 8px;
    }
  }
`;

const CreateWorkspaceForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .arkynFieldWrapper {
    padding: 20px;
    border-radius: 8px;
    border: 1px solid rgb(var(--spotlight-primary));
    outline: 1px solid rgb(var(--spotlight-primary));

    background-color: rgba(var(--spotlight-primary), 0.05);
  }
`;

export { PageContainer, CreateWorkspaceForm, ListContainer };

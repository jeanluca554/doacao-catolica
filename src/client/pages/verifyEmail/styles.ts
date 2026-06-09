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

  .notReceived {
    display: flex;
    flex-direction: column;
    gap: 16px;

    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 16px;

    strong {
      font-weight: 600;
      font-size: 16px;
      color: var(--text-heading);
      line-height: 130%;
      letter-spacing: 0%;
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 8px;
      list-style: none;

      li {
        font-weight: 400;
        font-size: 14px;
        line-height: 130%;
        letter-spacing: 0%;
        color: var(--text-muted);

        margin-left: 16px;
        position: relative;

        &::before {
          content: " ";
          position: absolute;
          left: -16px;
          top: 50%;
          transform: translateY(-50%);
          width: 5px;
          height: 5px;
          background-color: var(--text-muted);
          border-radius: 50%;
        }
      }
    }
  }

  @media (max-width: 500px) {
    width: 100vw;
    padding: 16px;
    gap: 6px;
  }
`;

export { PageContainer };

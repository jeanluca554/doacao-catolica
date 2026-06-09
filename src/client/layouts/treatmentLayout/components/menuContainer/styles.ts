import { styled } from "@linaria/react";
import { screenBreakpoints } from "~/client/themes/screenBreakpoints";

const Container = styled.div`
  > section {
    display: flex;
  }

  > .arkynDrawerContainer {
    display: none;
  }

  ${screenBreakpoints.md} {
    > .arkynDrawerContainer {
      display: unset;

      section {
        border-right: none;
      }
    }

    > section {
      display: none;
    }
  }
`;

const Content = styled.section`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  height: 100%;

  background: var(--background-foreground);
  border-right: 1px solid var(--border);
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: var(--card-foreground-primary);
  margin-bottom: 8px;
  padding: 16px;

  border-bottom: 1px solid var(--border);

  .img {
    min-height: 44px;
    max-height: 44px;
    min-width: 44px;
    max-width: 44px;
    border-radius: 50%;

    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }

  > div {
    width: 100%;
    display: flex;
    flex-direction: column;

    strong {
      font-weight: 600;
      font-size: 16px;
      letter-spacing: 0%;
      color: var(--text-body);
    }

    > div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        font-weight: 400;
        font-size: 14px;
        letter-spacing: 0%;
        color: var(--text-body);
      }
    }
  }
`;

export { Container, Content, UserContainer };

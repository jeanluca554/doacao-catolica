import { styled } from "@linaria/react";

const ChangeButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;

  width: 250px;
  background: transparent;

  padding: 0 8px;
  border-radius: 4px;
  border: 1px solid var(--border);

  min-height: 38px;
  max-height: 38px;

  img {
    height: 24px;
    width: 24px;
    border-radius: 4px;
  }

  p {
    font-size: 14px;
    line-height: 14px;
    font-weight: 400;
    color: var(--text-body);
  }

  svg {
    margin-left: auto;
    height: 16px;
    width: 16px;
    color: var(--text-body);
  }

  &:hover {
    cursor: pointer;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;

  padding: 12px;
  gap: 12px;

  > small {
    font-weight: 400;
    font-size: 10px;
    line-height: 100%;
    letter-spacing: 0%;
    color: var(--text-muted);
  }
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 8px;

  background: transparent;

  img {
    height: 32px;
    width: 32px;
    border-radius: 4px;
  }

  p {
    font-size: 14px;
    line-height: 14px;
    font-weight: 600;
    color: var(--text-heading);
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  gap: 12px;

  a {
    text-decoration: none;
    color: inherit;
    border-radius: 4px;

    li {
      display: flex;
      align-items: center;
      gap: 8px;

      background: transparent;
      padding: 8px;

      img {
        height: 24px;
        width: 24px;
        border-radius: 4px;
      }

      p {
        font-size: 14px;
        line-height: 14px;
        font-weight: 600;
        color: var(--text-heading);
      }
    }

    &:hover {
      cursor: pointer;
      background: var(--card-foreground-primary);
    }
  }
`;

export { ChangeButton, Container, Header, List };

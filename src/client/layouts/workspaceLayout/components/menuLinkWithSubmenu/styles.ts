import { styled } from "@linaria/react";
import { Link } from "react-router";

const Container = styled.button`
  display: flex;
  align-items: center;
  justify-content: start;

  position: relative;

  text-decoration: none;
  padding: 0 16px;
  border: none;
  background: none;
  width: 100%;

  > p {
    flex: 1;
    overflow: hidden;

    padding: 0 16px;
    gap: 18px;
    min-height: 45px;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: start;

    font-size: 14px;
    font-weight: 400;
    line-height: 19.07px;
    text-align: left;
    color: var(--text-body);

    > svg:not(.chevron) {
      min-height: 24px;
      min-width: 24px;
    }

    > .chevron {
      min-height: 20px;
      min-width: 20px;
      margin-left: auto;
      transition: transform 0.2s ease;
      color: var(--text-muted);
    }
  }

  &:hover {
    cursor: pointer;

    p {
      background-color: var(--card-foreground-primary);
    }
  }

  &.open > p > .chevron {
    transform: rotate(180deg);
  }

  &.active {
    cursor: auto;

    > p {
      font-weight: 600;
      color: var(--text-heading);
      background-color: var(--card-foreground-primary);

      > svg:not(.chevron) {
        color: rgba(var(--spotlight-primary), 1);
      }
    }

    &::before {
      content: "";
      position: absolute;
      left: 0;
      top: 7px;
      bottom: 7px;
      width: 4px;

      border-radius: 0px 99999px 99999px 0px;
      background-color: rgba(var(--spotlight-primary), 1);
    }
  }
`;

const SubMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 6px 0 0 16px;
`;

const SubMenuItem = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: start;

  text-decoration: none;
  padding: 0 16px;

  > p {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;

    padding: 0 16px;
    min-height: 45px;
    border-radius: 8px;

    display: flex;
    align-items: center;
    justify-content: start;

    font-size: 14px;
    font-weight: 400;
    line-height: 19.07px;
    text-align: left;
    color: var(--text-body);
  }

  &:hover {
    cursor: pointer;

    > p {
      background-color: var(--card-foreground-primary);
    }
  }

  &.active {
    cursor: auto;

    > p {
      font-weight: 600;
      color: var(--text-heading);
      background-color: var(--card-foreground-primary);
    }
  }
`;

export { Container, SubMenuContainer, SubMenuItem };

import { styled } from "@linaria/react";
import { Link } from "react-router";

const Container = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: start;

  position: relative;

  text-decoration: none;
  padding: 0 16px;

  > p {
    flex: 1;
    overflow: hidden;
    white-space: nowrap;

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

    > svg {
      min-height: 24px;
      min-width: 24px;
    }
  }

  &:hover {
    cursor: pointer;

    p {
      background-color: var(--card-foreground-primary);
    }
  }

  &.active {
    cursor: auto;

    > p {
      font-weight: 600;
      color: var(--text-heading);
      background-color: var(--card-foreground-primary);

      > svg {
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

export { Container };

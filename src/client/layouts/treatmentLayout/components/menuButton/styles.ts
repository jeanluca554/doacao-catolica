import { styled } from "@linaria/react";
import { screenBreakpoints } from "~/client/themes/screenBreakpoints";

const Container = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  border: none;
  background: none;

  padding: 8px;
  gap: 4px;

  > div {
    width: 18px;
    height: 2px;
    background-color: var(--text-muted);
    border-radius: 2px;
  }

  &:hover {
    cursor: pointer;
    background: var(--card-foreground-primary);
  }

  ${screenBreakpoints.md} {
    display: flex;
  }
`;

export { Container };

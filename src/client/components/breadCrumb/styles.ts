import { styled } from "@linaria/react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 8px;

  p {
    font-weight: 400;
    font-size: 12px;
    line-height: 12px;

    color: var(--text-muted);
  }

  h1 {
    font-weight: 600;
    font-size: 20px;
    line-height: 20px;
    color: var(--text-heading);
  }

  hr {
    width: 24px;
    border: solid 2px rgb(var(--spotlight-primary));
    border-radius: 3px;
    margin-top: -4px;
  }
`;

export { Container };

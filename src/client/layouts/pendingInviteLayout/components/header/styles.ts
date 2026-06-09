import { styled } from "@linaria/react";

const Container = styled.header`
  display: flex;
  align-items: center;
  gap: 16px;

  background: var(--background-foreground);
  border-bottom: 1px solid var(--border);

  height: 60px;
  padding: 16px 24px;

  > img {
    height: 24px;
    margin-right: auto;
  }
`;

export { Container };

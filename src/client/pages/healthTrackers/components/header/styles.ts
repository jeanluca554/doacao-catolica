import { styled } from "@linaria/react";

const Container = styled.header`
  display: flex;
  align-items: center;
  gap: 8px;

  h1 {
    font-weight: 600;
    font-size: 24px;
    line-height: 24px;
    color: var(--text-heading);
    margin-right: auto;
  }
`;

export { Container };

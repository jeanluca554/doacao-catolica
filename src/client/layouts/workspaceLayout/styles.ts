import { styled } from "@linaria/react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.main`
  display: flex;
  min-height: calc(100vh - 60px);
`;

export { Container, Content };

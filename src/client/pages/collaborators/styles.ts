import { styled } from "@linaria/react";

const Container = styled.main`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 32px;
  padding: 32px;
`;

const TabContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  flex: 1;
  transition: opacity 0.15s ease-in-out;

  &.fade-out {
    opacity: 0;
  }

  &.fade-in {
    opacity: 1;
  }
`;

export { Container, TabContentWrapper };

import { styled } from "@linaria/react";

const RootDocumentContainer = styled.body`
  background: var(--card-foreground-primary);
  overflow-x: hidden;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
`;

export { RootDocumentContainer };

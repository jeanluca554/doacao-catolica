import { styled } from "@linaria/react";

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 12px;

  h2 {
    font-size: 16px;
    font-weight: 600;
    line-height: 22px;
    color: var(--text-heading);
  }

  .medicationGrid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
`;

export { SectionContainer };

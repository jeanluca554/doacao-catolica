import { styled } from "@linaria/react";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
`;

const ChooseCardContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;

  border: 1px solid var(--border);

  .svgContainer {
    border-radius: 8px;
    height: 56px;
    width: 56px;

    svg {
      height: 32px;
      width: 32px;
    }
  }

  div {
    strong {
      font-weight: 600;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: 0%;
      color: var(--text-heading);
    }

    p {
      font-weight: 400;
      font-size: 14px;
      line-height: 20px;
      letter-spacing: 0%;
      color: var(--text-body);
    }
  }
`;

export { ModalContent, ChooseCardContainer };

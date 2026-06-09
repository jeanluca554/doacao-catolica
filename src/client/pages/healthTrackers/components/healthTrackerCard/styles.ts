import { styled } from "@linaria/react";

const Container = styled.div`
  position: relative;
  overflow: hidden;

  padding: 24px;
  padding-top: calc(24px + 8px);
  gap: 32px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  background-color: var(--background-foreground);

  &::before {
    content: " ";
    position: absolute;
    background-color: rgb(var(--spotlight-primary));
    height: 8px;

    top: 0;
    left: -10px;
    right: -10px;
  }

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .svgContainer {
      height: 44px;
      width: 44px;

      display: flex;
      align-items: center;
      justify-content: center;

      background-color: rgba(var(--spotlight-primary), 0.1);
      border-radius: 8px;

      svg {
        height: 32px;
        width: 32px;
        color: rgb(var(--spotlight-primary));
      }
    }

    .arkynIconButtonContent svg {
      stroke: var(--text-muted) !important;
    }
  }

  .descriptionArea {
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
      line-height: 16px;
      letter-spacing: 0%;
      color: var(--text-body);
    }
  }

  .infoBadges {
    display: flex;
    justify-content: space-between;
    gap: 8px;
    align-items: center;
  }

  .comment {
    padding: 16px;
    background-color: var(--card-foreground-primary);
    border-radius: 8px;

    font-weight: 400;
    font-style: Italic;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0%;
    color: var(--text-body);
  }

  footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &:hover {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    transform: scale(1.03);
    box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.1);
  }
`;

export { Container };

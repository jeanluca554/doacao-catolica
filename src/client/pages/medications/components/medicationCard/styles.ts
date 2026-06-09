import { styled } from "@linaria/react";

type Variant = "active" | "history";

const MedicationCardContainer = styled.div<{ $variant: Variant }>`
  display: flex;
  flex-direction: column;
  gap: 32px;

  padding: 18px 16px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--background-foreground);
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);

  width: 100%;
  max-width: 410px;

  .cardTop {
    display: flex;
    align-items: center;
    gap: 12px;

    .actionButtons {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      margin-left: auto;

      > div {
        display: flex;
      }
    }
  }
  .medicationName {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .iconBox {
    display: inline-flex;
    align-items: center;
    justify-content: center;

    flex-shrink: 0;

    width: 40px;
    height: 40px;
    border-radius: 8px;

    color: ${({ $variant }) => ($variant === "active" ? "#09aa68" : "#ff5470")};
    background: ${({ $variant }) =>
      $variant === "active" ? "#eefaf4" : "#fff0f3"};
  }

  strong {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    color: var(--text-heading);
  }

  .dosage {
    font-size: 14px;
    line-height: 20px;
    color: var(--text-body);
  }

  .cardFooter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .dateInfo,
  .reminderInfo {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: var(--text-muted);
    font-size: 13px;
    line-height: 18px;

    span {
      color: var(--text-body);
    }
  }

  .toggle {
    position: relative;
    width: 32px;
    height: 18px;
    border-radius: 999px;
    background: #c7c9d1;
    transition: background-color 0.2s ease;

    span {
      position: absolute;
      top: 2px;
      left: 2px;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #ffffff;
      box-shadow: 0 1px 2px rgba(15, 23, 42, 0.18);
      transition: transform 0.2s ease;
    }

    &.is-on {
      background: #09aa68;

      span {
        transform: translateX(14px);
      }
    }
  }
`;

export { MedicationCardContainer };

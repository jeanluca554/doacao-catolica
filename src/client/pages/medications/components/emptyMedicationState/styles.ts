import { styled } from "@linaria/react";

type Variant = "active" | "history";

const EmptyStateContainer = styled.div<{ $variant: Variant }>`
  position: relative;
  overflow: hidden;

  display: flex;
  align-items: center;
  gap: 16px;

  min-height: 116px;
  padding: 18px;

  border-radius: 12px;
  border: 1px solid var(--border);
  background: linear-gradient(
    120deg,
    ${({ $variant }) =>
        $variant === "active"
          ? "rgba(var(--spotlight-success), 0.08)"
          : "rgba(var(--spotlight-danger), 0.08)"}
      0%,
    var(--background-foreground) 100%
  );

  &::after {
    content: "";
    position: absolute;
    inset: auto -60px -60px auto;
    width: 140px;
    height: 140px;
    border-radius: 999px;
    opacity: 0.4;
    background: ${({ $variant }) =>
      $variant === "active"
        ? "rgba(var(--spotlight-success), 0.2)"
        : "rgba(var(--spotlight-danger), 0.2)"};
  }

  .iconWrapper {
    z-index: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    width: 46px;
    height: 46px;
    border-radius: 12px;

    color: ${({ $variant }) =>
      $variant === "active"
        ? "rgb(var(--spotlight-success))"
        : "rgb(var(--spotlight-danger))"};
    background: ${({ $variant }) =>
      $variant === "active"
        ? "rgba(var(--spotlight-success), 0.12)"
        : "rgba(var(--spotlight-danger), 0.12)"};
  }

  .content {
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  strong {
    color: var(--text-heading);
    font-size: 15px;
    line-height: 21px;
    font-weight: 700;
  }

  p {
    color: var(--text-body);
    font-size: 13px;
    line-height: 19px;
    max-width: 560px;
  }
`;

export { EmptyStateContainer };

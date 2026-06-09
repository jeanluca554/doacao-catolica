import type { ReactNode } from "react";
import { Container } from "./styled";

type Props = {
  icon: ReactNode;
  circleColor?: string;
  borderColor?: string;
  iconColor?: string;
  size?: number;
};

function DashedBorderCircle({
  icon,
  circleColor = "rgb(var(--spotlight-danger))",
  borderColor = "var(--border)",
  iconColor = "#fff",
  size = 120,
}: Props) {
  return (
    <Container
      $circleColor={circleColor}
      $borderColor={borderColor}
      $iconColor={iconColor}
      $size={size}
    >
      <div className="dashedBorderCircle">
        <div className="filledCircle">{icon}</div>
      </div>
    </Container>
  );
}

export { DashedBorderCircle };

import { styled } from "@linaria/react";

type Props = {
  $circleColor: string;
  $borderColor: string;
  $iconColor: string;
  $size: number;
};

const Container = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;

  .dashedBorderCircle {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;

    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;

    padding: 15px;

    background-color: var(--card-foreground-primary);
    border: 1px dashed ${({ $borderColor }) => $borderColor};

    .filledCircle {
      display: flex;
      align-items: center;
      justify-content: center;

      width: ${({ $size }) => $size * 0.75}px;
      height: ${({ $size }) => $size * 0.75}px;

      border-radius: 50%;
      background-color: ${({ $circleColor }) => $circleColor};

      svg {
        stroke: ${({ $iconColor }) => $iconColor};
        width: ${({ $size }) => $size * 0.4}px;
        height: ${({ $size }) => $size * 0.4}px;
      }
    }
  }
`;

export { Container };

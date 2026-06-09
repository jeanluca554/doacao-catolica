import { styled } from "@linaria/react";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  flex-direction: column;
  padding: 32px;
  gap: 16px;

  position: relative;

  > .status {
    font-weight: 700;
    font-style: Bold;
    font-size: 200px;
    line-height: 100%;
    letter-spacing: -0.5px;
    text-align: center;
    color: var(--text-heading);
  }

  > .title {
    font-weight: 700;
    font-style: Bold;
    font-size: 48px;
    line-height: 100%;
    letter-spacing: 0%;
    text-align: center;
    color: var(--text-heading);
    margin-top: 30px;
    margin-bottom: 10px;
  }

  > p {
    font-weight: 400;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 0%;
    text-align: center;
    color: var(--text-body);
    max-width: 530px;
  }

  .buttonGroup {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 40px;
  }

  .bulletBox {
    position: absolute;
    height: 162px;
    width: 162px;

    &.first {
      bottom: 229px;
      left: 49px;
    }

    &.second {
      bottom: 29px;
      right: 39px;
    }
  }

  &::before {
    z-index: -1;

    content: " ";
    position: absolute;

    top: -250px;
    left: -250px;

    width: 396px;
    height: 396px;

    border-radius: 50%;

    border: 58px solid rgba(var(--spotlight-primary), 0.5);
  }

  &::after {
    z-index: -1;

    content: " ";
    position: absolute;

    top: 30px;
    right: -125px;

    width: 260px;
    height: 260px;

    border-radius: 50%;

    border: 58px solid rgba(var(--spotlight-primary), 0.5);
  }
`;

export { Container };

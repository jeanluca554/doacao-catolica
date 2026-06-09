import { styled } from "@linaria/react";

import showImagePng from "~/client/assets/show-image.png";
import { screenBreakpoints } from "~/client/themes/screenBreakpoints";

const LayoutContainer = styled.div`
  display: flex;
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;
  flex: 1;

  min-height: 100vh;

  > a {
    &:hover {
      cursor: pointer;
    }

    img {
      position: absolute;
      top: 56px;
      left: 56px;
      height: 40px;
    }
  }
`;

const HeroContainer = styled.div`
  display: flex;
  align-items: start;
  justify-content: end;
  gap: 14px;

  flex-direction: column;
  background-image: url(${showImagePng});
  background-size: cover;
  background-position: center;

  width: 685px;
  min-height: 100vh;
  padding: 120px 80px;

  span {
    font-weight: 300;
    font-size: 24px;
    letter-spacing: 0%;
    color: var(--text-body);
  }

  p {
    font-weight: 600;
    font-size: 36px;
    letter-spacing: 0%;
    color: #ffffff;
  }

  ${screenBreakpoints.lg} {
    display: none;
  }
`;

export { LayoutContainer, ContentContainer, HeroContainer };

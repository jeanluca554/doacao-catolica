import { styled } from "@linaria/react";

const AvatarContainer = styled.div`
  width: 32px;
  height: 32px;
  min-width: 32px;
  min-height: 32px;
  border-radius: 50%;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 600;
  font-size: 12px;
  line-height: 1;

  img {
    width: 32px;
    min-width: 32px;
    height: 32px;
    min-height: 32px;
    object-fit: cover;
    display: block;
  }

  .initials {
    display: inline-block;
    width: 100%;
    text-align: center;
    user-select: none;

    &.sm {
      font-size: 16px;
    }

    &.lg {
      font-size: 24px;
    }
  }
`;

export { AvatarContainer };

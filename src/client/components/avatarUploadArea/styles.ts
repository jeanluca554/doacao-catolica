import { ImageUpload } from "@arkyn/components";
import { styled } from "@linaria/react";

const Container = styled.div<{ $iconUrl: string }>`
  --avatar-icon-url: ${(props: { $iconUrl: string }) => props.$iconUrl};
`;

const StyledImageUpload = styled(ImageUpload)`
  .arkynImageUpload {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    width: 218px !important;
    height: 218px !important;

    padding: 16px;
    border: 1px solid var(--border);
    border-radius: 6px;
    background: var(--card);
    overflow: hidden;
  }

  .arkynImageUpload.noHasImage {
    border-style: solid;
  }

  .arkynImageUploadNoFileContent {
    gap: 20px;
    justify-content: flex-end;
  }

  .arkynImageUploadNoFileContent::before {
    content: "";
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    width: 108px;
    height: 108px;
    border-radius: 999px;
    border: 4px solid var(--border);
    background-color: var(--card);
    background-repeat: no-repeat;
    background-position: center;
    background-size: 76px;
    background-image: var(--avatar-icon-url, none);
  }

  .arkynImageUploadNoFileContent > p {
    display: none;
  }

  .arkynImageUploadNoFileContent {
    .arkynButton {
      font-size: 14px !important;
      height: 40px !important;
      padding: 0 20px !important;
      border-radius: 6px !important;
    }
  }

  .arkynImageUpload .arkynButton {
    border: none;
    border-radius: 6px;
    padding: 0 24px;
    background: #e4f4ed;
    color: rgb(var(--spotlight-primary));
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
  }

  .arkynImageUpload .arkynButton:hover {
    filter: brightness(0.98);
  }

  .arkynImageUploadHasFileContent {
    border-radius: 10px;
  }
`;

export { Container, StyledImageUpload };

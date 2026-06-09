import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

import { UserRound } from "lucide-react";
import { Container, StyledImageUpload } from "./styles";

type AvatarUploadAreaProps = {
  name: string;
  action: string;
  defaultValue?: string | null;
  selectImageButtonText?: string;
  changeImageButtonText?: string;
  dropImageText?: string;
  iconUrl?: string;
};

const defaultAvatarIconUrl = `url("data:image/svg+xml,${encodeURIComponent(
  renderToStaticMarkup(
    createElement(UserRound, { size: 68, strokeWidth: 1.4, color: "#A1A1AA" }),
  ),
)}")`;

function AvatarUploadArea({
  name,
  action,
  defaultValue,
  selectImageButtonText = "Adicionar foto",
  changeImageButtonText = "Trocar foto",
  dropImageText = "",
  iconUrl = defaultAvatarIconUrl,
}: AvatarUploadAreaProps) {
  return (
    <Container $iconUrl={iconUrl}>
      <StyledImageUpload
        name={name}
        action={action}
        defaultValue={defaultValue}
        selectImageButtonText={selectImageButtonText}
        changeImageButtonText={changeImageButtonText}
        dropImageText={dropImageText}
      />
    </Container>
  );
}

export { AvatarUploadArea };

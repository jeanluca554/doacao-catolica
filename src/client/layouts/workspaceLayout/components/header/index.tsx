import horizontalLogo from "~/client/assets/horizontal-logo.svg";
import { ChangeWorkspace } from "../changeWorkspace";
import { IconMenu } from "../iconMenu";
import { MenuButton } from "../menuButton";
import { Container } from "./styles";

function Header() {
  return (
    <Container>
      <MenuButton />
      <img src={horizontalLogo} alt="InovaMed" />
      <ChangeWorkspace />
      <IconMenu />
    </Container>
  );
}

export { Header };

import horizontalLogo from "~/client/assets/horizontal-logo.svg";
import { Container } from "./styles";

function Header() {
  return (
    <Container>
      <img src={horizontalLogo} alt="InovaMed" />
    </Container>
  );
}

export { Header };

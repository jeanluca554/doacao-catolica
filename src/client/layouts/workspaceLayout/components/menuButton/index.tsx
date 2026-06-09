import { useDrawer } from "@arkyn/components";
import { Container } from "./styles";

function MenuButton() {
  const { drawerIsOpen, closeDrawer, openDrawer } =
    useDrawer("navigation-drawer");

  function toggleMenu() {
    if (drawerIsOpen) closeDrawer();
    else openDrawer();
  }

  return (
    <Container onClick={toggleMenu}>
      <div />
      <div />
      <div />
    </Container>
  );
}

export { MenuButton };

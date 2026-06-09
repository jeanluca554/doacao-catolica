import { DrawerContainer, DrawerHeader, useDrawer } from "@arkyn/components";
import { StickyContent } from "../stickyContent";
import { Container, Content } from "./styles";

type MenuContainerProps = {
  children?: React.ReactNode;
};

function MenuContainer({ children }: MenuContainerProps) {
  const { drawerIsOpen, closeDrawer } = useDrawer("navigation-drawer");

  return (
    <Container>
      <Content>
        <StickyContent>{children}</StickyContent>
      </Content>

      <DrawerContainer isVisible={drawerIsOpen} makeInvisible={closeDrawer}>
        <DrawerHeader>Navegação:</DrawerHeader>
        <Content>
          <StickyContent>{children}</StickyContent>
        </Content>
      </DrawerContainer>
    </Container>
  );
}

export { MenuContainer };

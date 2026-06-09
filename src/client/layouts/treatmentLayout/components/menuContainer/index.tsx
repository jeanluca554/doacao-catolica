import {
  Badge,
  DrawerContainer,
  DrawerHeader,
  useDrawer,
} from "@arkyn/components";
import { StickyContent } from "../stickyContent";
import { Container, Content, UserContainer } from "./styles";

type MenuContainerProps = {
  children?: React.ReactNode;
};

function MenuContainer({ children }: MenuContainerProps) {
  const { drawerIsOpen, closeDrawer } = useDrawer("navigation-drawer");

  return (
    <Container>
      <Content>
        <StickyContent>
          <UserContainer>
            <div
              className="img"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1608681299041-cc19878f79f1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8b2xkJTIwbWVufGVufDB8fDB8fHww')`,
              }}
            />

            <div>
              <strong>Francisco Dias</strong>
              <div>
                <p>79 anos</p>
                <Badge>Ativo</Badge>
              </div>
            </div>
          </UserContainer>
          {children}
        </StickyContent>
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

import { Outlet } from "react-router";
import { Header } from "./components/header";
import { Container, Content } from "./styles";

function PendingInvitesLayout() {
  return (
    <Container>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}

export { PendingInvitesLayout };

import { Link, Outlet } from "react-router";
import verticalLogoPng from "~/client/assets/vertical-logo.svg";
import { ContentContainer, HeroContainer, LayoutContainer } from "./styles";

function SignLayout() {
  return (
    <LayoutContainer>
      <ContentContainer>
        <Link to="/sign-in">
          <img src={verticalLogoPng} alt="InovaMed" />
        </Link>
        <Outlet />
      </ContentContainer>

      <HeroContainer></HeroContainer>
    </LayoutContainer>
  );
}

export { SignLayout };

import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { useLocation } from "react-router";

import { Container } from "./styles";

type MenuLinkProps = {
  to: string;
  children: ReactNode;
  icon: LucideIcon;
};

function MenuLink(arg: MenuLinkProps) {
  const { children, to, icon: Icon } = arg;
  const { pathname } = useLocation();

  const isActive = pathname.includes(to) ? "active" : "";

  return (
    <Container className={isActive} to={to} prefetch="intent">
      <p>
        <Icon /> {children}
      </p>
    </Container>
  );
}

export { MenuLink };

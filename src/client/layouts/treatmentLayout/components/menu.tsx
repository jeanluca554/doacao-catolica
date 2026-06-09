import {
  Calendar,
  CalendarHeart,
  ClipboardCheck,
  HeartPulse,
  LayoutGrid,
  Pill,
  Search,
} from "lucide-react";
import { MenuContainer } from "./menuContainer";
import { MenuLink } from "./menuLink";

function Menu() {
  return (
    <MenuContainer>
      <MenuLink to="/home" icon={LayoutGrid}>
        Visão geral
      </MenuLink>
      <MenuLink to="/collaborators" icon={Calendar}>
        Consultas
      </MenuLink>
      <MenuLink to="/professionals" icon={HeartPulse}>
        Mapa de saúde
      </MenuLink>
      <MenuLink to="medications" icon={Pill}>
        Medicamentos
      </MenuLink>
      <MenuLink to="/follow-ups" icon={ClipboardCheck}>
        Questionários
      </MenuLink>
      <MenuLink to="/health-trackers" icon={Search}>
        Rastreadores de saúde
      </MenuLink>
    </MenuContainer>
  );
}

export { Menu };

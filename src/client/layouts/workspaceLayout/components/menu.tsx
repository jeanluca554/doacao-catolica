import {
  ClipboardList,
  LayoutGrid,
  Stethoscope,
  UserRound,
  Users2,
} from "lucide-react";
import { MenuContainer } from "./menuContainer";
import { MenuLink } from "./menuLink";
import { MenuLinkWithSubmenu } from "./menuLinkWithSubmenu";

function Menu() {
  return (
    <MenuContainer>
      <MenuLink to="/home" icon={LayoutGrid}>
        Dashboard
      </MenuLink>
      <MenuLink to="collaborators" icon={Users2}>
        Colaboradores
      </MenuLink>
      <MenuLink to="/professionals" icon={Stethoscope}>
        Profissionais
      </MenuLink>
      <MenuLinkWithSubmenu
        label="Pacientes"
        icon={UserRound}
        submenus={[
          { label: "Lista de pacientes", to: "patients" },
          { label: "Adicionar paciente", to: "patients/create" },
        ]}
      />
      <MenuLink to="/follow-ups" icon={ClipboardList}>
        Acompanhamentos
      </MenuLink>
    </MenuContainer>
  );
}

export { Menu };

import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocation } from "react-router";
import { Container, SubMenuContainer, SubMenuItem } from "./styles";
export type SubMenu = { label: string; to: string };
type MenuLinkWithSubmenuProps = {
  label: string;
  icon: LucideIcon;
  submenus: SubMenu[];
};
function MenuLinkWithSubmenu({
  label,
  icon: Icon,
  submenus,
}: MenuLinkWithSubmenuProps) {
  const { pathname } = useLocation();

  const normalizePath = (path: string) => path.replace(/\/+$/, "") || "/";

  const normalizeRelativePath = (path: string) =>
    normalizePath(path).replace(/^\/+/, "");

  const isPathActive = (path: string) => {
    const currentPath = normalizePath(pathname);
    const targetPath = normalizePath(path);

    if (targetPath.startsWith("/")) {
      return currentPath === targetPath;
    }

    return currentPath.endsWith(`/${normalizeRelativePath(path)}`);
  };

  const hasActiveSubmenu = submenus.some((submenu) => isPathActive(submenu.to));
  const [isOpen, setIsOpen] = useState(hasActiveSubmenu);
  const isActive = hasActiveSubmenu ? "active" : "";

  useEffect(() => {
    setIsOpen(hasActiveSubmenu);
  }, [hasActiveSubmenu]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Container
        onClick={handleToggle}
        className={`${isActive} ${isOpen ? "open" : ""}`}
      >
        <p>
          <Icon /> <span>{label}</span> <ChevronDown className="chevron" />{" "}
        </p>
      </Container>
      {isOpen && (
        <SubMenuContainer>
          {submenus.map((submenu) => {
            const isSubmenuActive = isPathActive(submenu.to) ? "active" : "";
            return (
              <SubMenuItem
                key={submenu.to}
                to={submenu.to}
                className={isSubmenuActive}
                prefetch="intent"
              >
                <p>{submenu.label}</p>
              </SubMenuItem>
            );
          })}
        </SubMenuContainer>
      )}
    </>
  );
}
export { MenuLinkWithSubmenu };

import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import { LayoutDashboard, ListOrdered } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ProfileSelector } from "./ProfileSelector";

export function Navigation() {
  const location = useLocation();

  return (
    <Navbar maxWidth="full" className="px-8">
      <NavbarBrand>
        <h1 className="font-bold text-xl">Gerenciador Financeiro</h1>
      </NavbarBrand>
      <NavbarContent className="gap-6" justify="center">
        <NavbarItem>
          <ProfileSelector />
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            to="/"
            variant={location.pathname === "/" ? "solid" : "light"}
            startContent={<LayoutDashboard size={20} />}
          >
            Dashboard
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            to="/transactions"
            variant={location.pathname === "/transactions" ? "solid" : "light"}
            startContent={<ListOrdered size={20} />}
          >
            Transações
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

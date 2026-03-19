import { CommandIcon } from "lucide-react";
import type * as React from "react";
import { Link } from "react-router";
import app from "../../../../app.json";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/shadcn/sidebar";
import { navSections } from "../nav-config";
import { Nav } from "./nav";
import { NavUser } from "./nav-user";

function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="offcanvas"
      {...props}
    >
      {/* @modify: Brand logo */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link to="/">
                <CommandIcon className="size-5!" />
                <span className="text-base font-semibold">{app.displayName}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navSections.map((section) => (
          <Nav
            key={section.key}
            section={section}
          />
        ))}
      </SidebarContent>

      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

export { AppSidebar };

import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/shadcn/sidebar";
import type { NavItem, NavSection } from "../nav-config";

// Extract the t function type from useTranslation("dashboard")
type DashboardT = ReturnType<typeof useTranslation<"dashboard">>["t"];

interface NavProps {
  section: NavSection;
}

// Helper to call t() with dynamic keys from nav-config
function tr(t: DashboardT, key: string): string {
  return String(t(key as never));
}

/**
 * Nav renders a single navigation section from nav-config.
 * Supports two item types: link, action.
 */
function Nav({ section }: NavProps) {
  const { t } = useTranslation("dashboard");
  const location = useLocation();

  return (
    <SidebarGroup className={section.className}>
      {section.label && <SidebarGroupLabel>{tr(t, section.label)}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {section.items.map((item) => (
            <NavItemRenderer
              key={item.key}
              item={item}
              pathname={location.pathname}
              t={t}
            />
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

// ---------------------------------------------------------------------------
// NavItem renderer — dispatches by item.type
// ---------------------------------------------------------------------------

interface NavItemRendererProps {
  item: NavItem;
  pathname: string;
  t: DashboardT;
}

function NavItemRenderer({ item, pathname, t }: NavItemRendererProps) {
  switch (item.type) {
    case "link": {
      const fullUrl = `/${item.path}`;
      const isActive = pathname === fullUrl || pathname.startsWith(`${fullUrl}/`);
      return (
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={isActive}
            tooltip={tr(t, item.titleKey)}
          >
            <Link to={fullUrl}>
              <item.icon />
              <span>{tr(t, item.titleKey)}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }

    case "action": {
      return (
        <SidebarMenuItem>
          <SidebarMenuButton tooltip={tr(t, item.titleKey)}>
            <item.icon />
            <span>{tr(t, item.titleKey)}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      );
    }
  }
}

export { Nav };

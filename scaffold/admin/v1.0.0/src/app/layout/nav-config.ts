import type { LucideIcon } from "lucide-react";
import { HomeIcon, InfoIcon } from "lucide-react";

// ---------------------------------------------------------------------------
// NavItem type system
// ---------------------------------------------------------------------------

/** Route link navigation item */
interface NavLinkItem {
  type: "link";
  key: string;
  icon: LucideIcon;
  /** i18n key under "dashboard" namespace */
  titleKey: string;
  /** Relative path segment, e.g. "home" */
  path: string;
}

/** Action button navigation item (click handler or external url) */
interface NavActionItem {
  type: "action";
  key: string;
  icon: LucideIcon;
  /** i18n key under "dashboard" namespace */
  titleKey: string;
  /** Action identifier for click handling */
  action?: string;
}

type NavItem = NavLinkItem | NavActionItem;

/** A group/section rendered as a SidebarGroup */
interface NavSection {
  key: string;
  /** Optional i18n key for SidebarGroupLabel */
  label?: string;
  items: NavItem[];
  /** Extra className applied to SidebarGroup, e.g. "mt-auto" */
  className?: string;
}

// ---------------------------------------------------------------------------
// Navigation configuration — @modify: navigation items
// ---------------------------------------------------------------------------

const navSections: NavSection[] = [
  // @modify: main navigation section
  {
    key: "main",
    items: [
      { type: "link", key: "home", icon: HomeIcon, titleKey: "nav.home", path: "home" },
      { type: "link", key: "about", icon: InfoIcon, titleKey: "nav.about", path: "about" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

/**
 * Resolve the page title i18n key from nav-config based on current pathname.
 * Falls back to "nav.home" if no match is found.
 */
function getPageTitleKey(sections: NavSection[], pathname: string): string {
  for (const section of sections) {
    for (const item of section.items) {
      if (item.type === "link") {
        const suffix = `/${item.path}`;
        if (pathname.endsWith(suffix) || pathname.includes(`${suffix}/`)) {
          return item.titleKey;
        }
      }
    }
  }
  return "nav.home";
}

export { getPageTitleKey, navSections };
export type { NavActionItem, NavItem, NavLinkItem, NavSection };

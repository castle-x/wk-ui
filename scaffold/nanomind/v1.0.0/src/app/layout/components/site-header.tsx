import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { Separator } from "@/shared/shadcn/separator";
import { SidebarTrigger } from "@/shared/shadcn/sidebar";
import { SettingsDropdown } from "@/shared/wk/components/settings-dropdown";
import { getPageTitleKey, navSections } from "../nav-config";

function SiteHeader() {
  const { t } = useTranslation("dashboard");
  const location = useLocation();
  const titleKey = getPageTitleKey(navSections, location.pathname);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-vertical:h-4 data-vertical:self-center"
        />
        <h1 className="text-base font-medium">{t(titleKey as never)}</h1>
        <div className="ml-auto flex items-center gap-1">
          <SettingsDropdown />
        </div>
      </div>
    </header>
  );
}

export { SiteHeader };

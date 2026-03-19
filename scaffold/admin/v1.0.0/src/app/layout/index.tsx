import { Outlet } from "react-router";
import { SidebarInset, SidebarProvider } from "@/shared/shadcn/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";

function DashboardLayout() {
  return (
    <SidebarProvider className="h-svh !min-h-0">
      <AppSidebar variant="inset" />
      <SidebarInset className="min-h-0 overflow-hidden">
        <SiteHeader />
        <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export { DashboardLayout };

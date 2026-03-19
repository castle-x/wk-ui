import { HomeIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import app from "../../../app.json";

export function HomePage() {
  const { t } = useTranslation("dashboard");

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <div className="px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <HomeIcon className="size-6 text-muted-foreground" />
            <h2 className="text-xl font-semibold">{t("nav.home")}</h2>
          </div>
          <p className="mt-4 text-muted-foreground">
            {t("pages.home.description", { name: app.displayName })}
          </p>
        </div>
      </div>
    </div>
  );
}

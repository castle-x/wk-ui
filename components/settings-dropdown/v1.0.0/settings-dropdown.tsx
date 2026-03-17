import {
  LanguagesIcon,
  MonitorIcon,
  MoonIcon,
  PaletteIcon,
  Settings2Icon,
  SunIcon,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import type { Locale } from "@/shared/hooks/use-locale";
import { SUPPORTED_LOCALES, useLocale } from "@/shared/hooks/use-locale";
import { ACCENT_COLOR_CONFIGS, BASE_COLOR_CONFIGS, useColorTheme } from "@/shared/hooks/use-theme";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/shadcn/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from "@/shared/shadcn/tabs";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/shadcn/tooltip";

const LOCALE_LABELS: Record<Locale, string> = {
  "zh-CN": "简体中文",
  en: "English",
};

function SettingsDropdown() {
  const { t } = useTranslation("theme");
  const { theme, setTheme } = useTheme();
  const { locale, setLocale } = useLocale();
  const { accentColor, baseColor, setAccentColor, setBaseColor } = useColorTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-xs"
        >
          <Settings2Icon className="size-4" />
          <span className="sr-only">{t("dropdown.title")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64"
      >
        {/* Language Section */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-2">
            <LanguagesIcon className="size-4" />
            {t("dropdown.language")}
          </DropdownMenuLabel>
          <div className="px-1.5 py-1">
            <Tabs
              value={locale}
              onValueChange={(value) => setLocale(value as Locale)}
              className="w-full"
            >
              <TabsList className="w-full">
                {SUPPORTED_LOCALES.map((loc) => (
                  <TabsTrigger
                    key={loc}
                    value={loc}
                    className="flex-1"
                  >
                    {LOCALE_LABELS[loc]}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Theme Mode Section */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-2">
            {t("dropdown.theme")}
          </DropdownMenuLabel>
          <div className="px-1.5 py-1">
            <Tabs
              value={theme}
              onValueChange={setTheme}
              className="w-full"
            >
              <TabsList className="w-full">
                <TabsTrigger
                  value="light"
                  aria-label={t("mode.light")}
                  className="flex-1"
                >
                  <SunIcon className="size-4" />
                </TabsTrigger>
                <TabsTrigger
                  value="dark"
                  aria-label={t("mode.dark")}
                  className="flex-1"
                >
                  <MoonIcon className="size-4" />
                </TabsTrigger>
                <TabsTrigger
                  value="system"
                  aria-label={t("mode.system")}
                  className="flex-1"
                >
                  <MonitorIcon className="size-4" />
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Color Theme Section */}
        <DropdownMenuGroup>
          <DropdownMenuLabel className="flex items-center gap-2">
            <PaletteIcon className="size-4" />
            {t("accent.label")}
          </DropdownMenuLabel>
          <div className="grid grid-cols-3 gap-1 px-1.5 py-1">
            {ACCENT_COLOR_CONFIGS.map((config) => (
              <Tooltip key={config.name}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      accentColor === config.name && "bg-accent text-accent-foreground",
                    )}
                    onClick={() => setAccentColor(config.name)}
                  >
                    <span
                      className="size-3 shrink-0 rounded-full ring-1 ring-foreground/15"
                      style={{ backgroundColor: config.activeColor }}
                    />
                    <span className="truncate">{t(`accent.${config.name}`)}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{t(`accent.${config.name}`)}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Base Color Section */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("base.label")}</DropdownMenuLabel>
          <div className="grid grid-cols-2 gap-1 px-1.5 py-1">
            {BASE_COLOR_CONFIGS.map((config) => (
              <Tooltip key={config.name}>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "inline-flex h-7 items-center gap-1.5 rounded-md px-2 text-xs transition-colors",
                      "hover:bg-accent hover:text-accent-foreground",
                      baseColor === config.name && "bg-accent text-accent-foreground",
                    )}
                    onClick={() => setBaseColor(config.name)}
                  >
                    <span
                      className="size-3 shrink-0 rounded-full ring-1 ring-foreground/15"
                      style={{ backgroundColor: config.activeColor }}
                    />
                    <span className="truncate">{t(`base.${config.name}`)}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{t(`base.${config.name}`)}</TooltipContent>
              </Tooltip>
            ))}
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export { SettingsDropdown };

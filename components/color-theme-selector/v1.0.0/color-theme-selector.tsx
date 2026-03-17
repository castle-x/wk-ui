import { PaletteIcon } from "lucide-react";
import { useTranslation } from "react-i18next";

import { ACCENT_COLOR_CONFIGS, BASE_COLOR_CONFIGS, useColorTheme } from "@/shared/hooks/use-theme";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/shadcn/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/shadcn/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/shadcn/tooltip";

function ColorThemeSelector() {
  const { t } = useTranslation("theme");
  const { accentColor, baseColor, setAccentColor, setBaseColor } = useColorTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-xs"
        >
          <PaletteIcon className="size-4" />
          <span className="sr-only">{t("selector.title")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64"
      >
        {/* Accent color section */}
        <DropdownMenuGroup>
          <DropdownMenuLabel>{t("accent.label")}</DropdownMenuLabel>
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

        {/* Base color section */}
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

export { ColorThemeSelector };

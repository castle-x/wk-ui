import { useEffect } from "react";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import meta from "../../../meta.json";

const ACCENT_COLORS = [
  "neutral",
  "blue",
  "green",
  "orange",
  "red",
  "rose",
  "violet",
  "purple",
  "amber",
] as const;

const BASE_COLORS = ["neutral", "stone", "zinc", "mauve"] as const;

type AccentColor = (typeof ACCENT_COLORS)[number];
type BaseColor = (typeof BASE_COLORS)[number];

interface AccentColorConfig {
  name: AccentColor;
  activeColor: string;
}

interface BaseColorConfig {
  name: BaseColor;
  activeColor: string;
}

const ACCENT_COLOR_CONFIGS: AccentColorConfig[] = [
  { name: "neutral", activeColor: "oklch(0.205 0 0)" },
  { name: "blue", activeColor: "oklch(0.488 0.243 264.376)" },
  { name: "green", activeColor: "oklch(0.532 0.157 131.589)" },
  { name: "orange", activeColor: "oklch(0.553 0.195 38.402)" },
  { name: "red", activeColor: "oklch(0.505 0.213 27.518)" },
  { name: "rose", activeColor: "oklch(0.514 0.222 16.935)" },
  { name: "violet", activeColor: "oklch(0.491 0.27 292.581)" },
  { name: "purple", activeColor: "oklch(0.496 0.265 301.924)" },
  { name: "amber", activeColor: "oklch(0.555 0.163 48.998)" },
];

const BASE_COLOR_CONFIGS: BaseColorConfig[] = [
  { name: "neutral", activeColor: "oklch(0.556 0 0)" },
  { name: "stone", activeColor: "oklch(0.553 0.013 58.071)" },
  { name: "zinc", activeColor: "oklch(0.552 0.016 285.938)" },
  { name: "mauve", activeColor: "oklch(0.542 0.034 322.5)" },
];

interface ColorThemeState {
  accentColor: AccentColor;
  baseColor: BaseColor;
  setAccentColor: (color: AccentColor) => void;
  setBaseColor: (color: BaseColor) => void;
}

const useColorTheme = create<ColorThemeState>()(
  persist(
    (set) => ({
      accentColor: "neutral",
      baseColor: "neutral",
      setAccentColor: (color) => set({ accentColor: color }),
      setBaseColor: (color) => set({ baseColor: color }),
    }),
    { name: `${meta.name}-color-theme` },
  ),
);

/**
 * Sync color theme state to HTML data attributes.
 * Must be called once in a top-level component (e.g. ThemeProvider).
 */
function useColorThemeSync() {
  const { accentColor, baseColor } = useColorTheme();

  useEffect(() => {
    const root = document.documentElement;

    if (accentColor === "neutral") {
      root.removeAttribute("data-accent");
    } else {
      root.setAttribute("data-accent", accentColor);
    }

    if (baseColor === "neutral") {
      root.removeAttribute("data-base");
    } else {
      root.setAttribute("data-base", baseColor);
    }
  }, [accentColor, baseColor]);
}

export {
  ACCENT_COLORS,
  ACCENT_COLOR_CONFIGS,
  BASE_COLORS,
  BASE_COLOR_CONFIGS,
  useColorTheme,
  useColorThemeSync,
};
export type { AccentColor, AccentColorConfig, BaseColor, BaseColorConfig };

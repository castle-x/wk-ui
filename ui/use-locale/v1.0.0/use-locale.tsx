import { create } from "zustand";
import { persist } from "zustand/middleware";

export const SUPPORTED_LOCALES = ["zh-CN", "en"] as const;
export type Locale = (typeof SUPPORTED_LOCALES)[number];

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocale = create<LocaleState>()(
  persist(
    (set) => ({
      locale: "zh-CN",
      setLocale: (locale) => set({ locale }),
    }),
    { name: "locale" },
  ),
);

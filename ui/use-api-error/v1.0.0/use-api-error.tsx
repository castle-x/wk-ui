import { create } from "zustand";

export interface ApiErrorDetail {
  method: string;
  status: number;
  statusText: string;
  url: string;
  requestPayload?: unknown;
  responseBody?: unknown;
  rawError: string;
  timestamp: number;
}

interface ApiErrorState {
  error: ApiErrorDetail | null;
  show: (error: ApiErrorDetail) => void;
  hide: () => void;
}

export const useApiErrorStore = create<ApiErrorState>((set) => ({
  error: null,
  show: (error) => set({ error }),
  hide: () => set({ error: null }),
}));

/**
 * Show API error dialog from non-React code
 */
export function showApiErrorDialog(error: ApiErrorDetail): void {
  useApiErrorStore.getState().show(error);
}

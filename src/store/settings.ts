import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface SettingsState {
  commandLinePath: string;
  setCommandLinePath: (project: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  devtools(
    persist(
      (set) => ({
        commandLinePath: "",
        setCommandLinePath: (commandLinePath) =>
          set(() => ({
            commandLinePath,
          })),
      }),

      {
        name: "entourage-app-settings",
      }
    )
  )
);

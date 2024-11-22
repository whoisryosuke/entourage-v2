import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface AppState {
  currentProject: string;
  setCurrentProject: (project: string) => void;

  projectSidebar: boolean;
  toggleProjectSidebar: () => void;

  projects: Project[];
  addProject: (project: Project) => void;
  //   removeProject: (id: number) => void;

  blocks: Block[];
  addBlock: (block: Block) => void;
  //   removeBlock: (id: number) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    // Optional persist
    // This saves Zustand state when you close browser
    // Good in some cases, but not in others, especially prototyping
    // persist(

    (set) => ({
      // We keep the NextJS router in state because it's undefined in most components
      currentProject: "",
      setCurrentProject: (currentProject) =>
        set(() => ({
          currentProject,
        })),

      projectSidebar: false,
      toggleProjectSidebar: () =>
        set((state) => ({
          projectSidebar: !state.projectSidebar,
        })),

      projects: [],
      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),

      blocks: [],
      addBlock: (block) =>
        set((state) => ({
          blocks: [...state.blocks, block],
        })),

      // Add any default values for app-wide state here
      // e.g. game start logic, points/score, etc
      // gameStarted: true,
      // points: 100,
    })

    // END: Optional persist
    // )
  )
);

export default useAppStore;

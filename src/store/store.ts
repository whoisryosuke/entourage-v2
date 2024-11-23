import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Block, Project } from "./types";

export interface AppState {
  currentProject: string;
  setCurrentProject: (project: string) => void;

  projectSidebar: boolean;
  toggleProjectSidebar: () => void;

  editMode: boolean;
  toggleEditMode: () => void;

  projects: Project[];
  addProject: (project: Project) => void;
  /** Removes project and all associated blocks */
  removeProject: (id: number) => void;

  blocks: Block[];
  addBlock: (block: Block) => void;
  removeBlock: (id: number) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    // Optional persist
    // This saves Zustand state when you close browser
    // Good in some cases, but not in others, especially prototyping
    persist(
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

        editMode: false,
        toggleEditMode: () =>
          set((state) => ({
            editMode: !state.editMode,
          })),

        projects: [],
        addProject: (project) =>
          set((state) => ({
            projects: [...state.projects, project],
          })),
        removeProject: (projectIndex) =>
          set((state) => {
            const projectId = state.projects[projectIndex].id;
            return {
              projects: [
                ...state.projects.filter((_, index) => index !== projectIndex),
              ],
              blocks: [
                ...state.blocks.filter((block) => block.project !== projectId),
              ],
            };
          }),

        blocks: [],
        addBlock: (block) =>
          set((state) => ({
            blocks: [...state.blocks, block],
          })),
        removeBlock: (blockId) =>
          set((state) => ({
            blocks: [...state.blocks.filter((_, index) => index !== blockId)],
          })),

        // Add any default values for app-wide state here
        // e.g. game start logic, points/score, etc
        // gameStarted: true,
        // points: 100,
      }),

      // END: Optional persist
      {
        name: "entourage-app",
      }
    )
  )
);

export default useAppStore;

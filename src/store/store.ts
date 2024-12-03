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
  editBlockId: string;
  setEditBlockId: (editBlockId: string) => void;
  clearEditBlockId: () => void;

  projects: Project[];
  addProject: (project: Project) => void;
  /** Removes project and all associated blocks */
  removeProject: (id: number) => void;

  blocks: Block[];
  addBlock: (block: Block) => void;
  updateBlock: (id: string, block: Partial<Block>) => void;
  removeBlock: (id: string) => void;
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
        editBlockId: "",
        setEditBlockId: (editBlockId) =>
          set(() => ({
            editBlockId,
          })),
        clearEditBlockId: () =>
          set(() => ({
            editBlockId: "",
            projectSidebar: false,
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
        updateBlock: (blockId, newBlock) =>
          set((state) => {
            const blocks = [...state.blocks];
            const updatedBlocks = blocks.map((block) =>
              block.id == blockId ? ({ ...block, ...newBlock } as Block) : block
            );
            return {
              blocks: updatedBlocks,
            };
          }),
        removeBlock: (blockId) =>
          set((state) => ({
            blocks: [...state.blocks.filter((block) => block.id !== blockId)],
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

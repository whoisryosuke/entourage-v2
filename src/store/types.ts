export type Project = {
  id: string;
  name: string;
};

export const BLOCK_TYPES = ["vscode", "blender"] as const;
export type BlockTypes = (typeof BLOCK_TYPES)[number];
export const BLOCK_TYPE_TITLES: Record<BlockTypes, string> = {
  vscode: "VS Code",
  blender: "Blender",
};
export const BLOCK_TYPE_DESCRIPTIONS: Record<BlockTypes, string> = {
  vscode: "Open Project in VS Code",
  blender: "Open Project in Blender",
};
export const BLOCK_TYPE_BACKEND_CMD: Record<BlockTypes, string> = {
  vscode: "open_vscode_project",
  blender: "open_blender_project",
};
export const BLOCK_TYPE_CMD_PLACEHOLDER: Record<BlockTypes, string> = {
  vscode: "C:/Path/To/Code",
  blender: "C:/Path/To/project.blend",
};

export type Block = {
  name: string;
  type: BlockTypes;
  // The associated project
  project: string;
  command: string;
  notion: string;
  // Path to image (Tauri specific path)
  image: string;
  // Dates
  created_time: number;
  last_opened: number;
};

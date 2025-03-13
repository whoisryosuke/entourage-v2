export type Project = {
  id: string;
  name: string;
};

export const BLOCK_TYPES = [
  "vscode",
  "blender",
  "visualStudio",
  "openFolder",
  "launchCommandLine",
] as const;
export type BlockTypes = (typeof BLOCK_TYPES)[number];
export const BLOCK_TYPE_TITLES: Record<BlockTypes, string> = {
  vscode: "VS Code",
  blender: "Blender",
  openFolder: "Open Folder",
  launchCommandLine: "Command Line",
  visualStudio: "Visual Studio",
};
export const BLOCK_TYPE_DESCRIPTIONS: Record<BlockTypes, string> = {
  vscode: "Open Project in VS Code",
  blender: "Open Project in Blender",
  openFolder: "Open Folder in File Explorer",
  launchCommandLine: "Open Command Line app",
  visualStudio: "Open Solution in Visual Studio",
};
export const BLOCK_TYPE_BACKEND_CMD: Record<BlockTypes, string> = {
  vscode: "open_vscode_project",
  blender: "open_blender_project",
  openFolder: "open_folder",
  launchCommandLine: "open_command_line",
  visualStudio: "open_visual_studio_project",
};
export const BLOCK_TYPE_CMD_PLACEHOLDER: Record<BlockTypes, string> = {
  vscode: "C:/Path/To/Code",
  blender: "C:/Path/To/project.blend",
  openFolder: "C:/Path/To/Code",
  launchCommandLine: "npm run build",
  visualStudio: "C:/Path/To/project.sln",
};

export type Block = {
  id: string;
  name: string;
  type: BlockTypes;
  // The associated project
  project: string;
  command: string;
  path: string;
  notion: string;
  // Path to image (Tauri specific path)
  image: string;
  // Dates
  created_time: number;
  last_opened: number;
};

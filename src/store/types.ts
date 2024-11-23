export type Project = {
  id: string;
  name: string;
};

export const BLOCK_TYPES = ["vscode"] as const;
export type BlockTypes = (typeof BLOCK_TYPES)[number];
export const BLOCK_TYPE_DESCRIPTIONS: Record<BlockTypes, string> = {
  vscode: "Open Project in VS Code",
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
};

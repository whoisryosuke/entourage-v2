export type Project = {
  id: string;
  name: string;
};

export const BLOCK_TYPES = ["vscode"] as const;
export type BlockTypes = (typeof BLOCK_TYPES)[number];

export type Block = {
  name: string;
  type: BlockTypes;
  // The associated project
  project: string;
  command: string;
  // Path to image (Tauri specific path)
  image: string;
};

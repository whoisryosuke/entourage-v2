type Project = {
  id: string;
  name: string;
};

const BLOCK_TYPES = ["vscode"] as const;
type BlockTypes = typeof BLOCK_TYPES;

type Block = {
  name: string;
  type: BlockTypes;
  // The associated project
  project: string;
  command: string;
};

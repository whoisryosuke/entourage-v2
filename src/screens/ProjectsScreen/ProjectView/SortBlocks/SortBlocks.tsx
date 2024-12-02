import { Block } from "../../../../store/types";

export const SORT_TYPES = {
  alpha: "Alphabetical (A-Z)",
  alphaReverse: "Alphabetical (Z-A)",
  recent: "Recently Used",
  created: "Created Date (First to Last)",
};
export type SortTypes = keyof typeof SORT_TYPES;

type SortFunction = (a: Block, b: Block) => number;
export const SORT_ALGORITHMS: Record<SortTypes, SortFunction> = {
  alpha: (a, b) => a.name.localeCompare(b.name),
  alphaReverse: (a, b) => b.name.localeCompare(a.name),
  recent: (a, b) => a.last_opened - b.last_opened,
  created: (a, b) => a.created_time - b.created_time,
};

type Props = {
  sortType: string;
  handleSortTypeChange: any;
};

const SortBlocks = ({ sortType, handleSortTypeChange, ...props }: Props) => {
  const options = Object.entries(SORT_TYPES).map(([key, name]) => (
    <option key={key} value={key}>
      {name}
    </option>
  ));
  return (
    <select value={sortType} onChange={handleSortTypeChange} {...props}>
      {options}
    </select>
  );
};

export default SortBlocks;

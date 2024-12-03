import Select from "../../../components/Select";
import { BLOCK_TYPE_TITLES, BLOCK_TYPES } from "../../../store/types";

type Props = {
  blockTypeFilter: string;
  handleBlockTypeFilterChange: any;
};

const FilterType = ({
  blockTypeFilter,
  handleBlockTypeFilterChange,
  ...props
}: Props) => {
  const options = BLOCK_TYPES.map((key) => (
    <option key={key} value={key}>
      {BLOCK_TYPE_TITLES[key]}
    </option>
  ));
  return (
    <Select
      value={blockTypeFilter}
      onChange={handleBlockTypeFilterChange}
      {...props}
    >
      <option value="all">All</option>
      {options}
    </Select>
  );
};

export default FilterType;

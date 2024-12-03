import Input from "../../../../components/Input";
import "./FilterProjects.css";

type Props = {
  value: string;
  onChange: any;
};

const FilterProjects = ({ value, onChange }: Props) => {
  return (
    <div className="FilterProjects">
      <Input
        type="text"
        name="filter-projects"
        placeholder="Filter projects by name..."
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FilterProjects;

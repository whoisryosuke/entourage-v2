import React from "react";

type Props = {
  value: string;
  onChange: any;
};

const FilterProjects = ({ value, onChange }: Props) => {
  return (
    <div className="FilterProjects">
      <input
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

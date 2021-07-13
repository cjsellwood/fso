import React from "react";

const Filter = ({ search, changeSearch }) => {
  return (
    <div>
      filter shown with <input value={search} onChange={changeSearch} />
    </div>
  );
};

export default Filter;

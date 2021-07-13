import React from "react";

const Total = ({ parts }) => {
  return (
    <p>
      <strong>
        total of {parts.reduce((acc, cur) => acc + cur.exercises, 0)} exercises
      </strong>
    </p>
  );
};

export default Total;

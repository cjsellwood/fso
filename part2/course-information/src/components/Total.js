import React from "react";

const Total = ({ parts }) => {
  console.log(parts);
  return (
    <p>
      <strong>
        total of{" "}
        {parts.reduce((acc, cur) => {
          return acc + cur.exercises;
        }, 0)}{" "}
        exercises
      </strong>
    </p>
  );
};

export default Total;

import React from "react";
import { CoursePart } from "../types";

// Helper function for exhaustive type checking
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  switch (part.type) {
    case "normal":
      break;
    case "groupProject":
      break;
    case "submission":
      break;
    case "special":
      break;
    default:
      return assertNever(part);
  }
  return (
    <div>
      <h3>
        {part.name} {part.exerciseCount}
      </h3>
      {"description" in part ? <p>{part.description}</p> : null}
      {"groupProjectCount" in part ? (
        <p>group project exercises {part.groupProjectCount}</p>
      ) : null}
      {"exerciseSubmissionLink" in part ? (
        <p>submit to {part.exerciseSubmissionLink}</p>
      ) : null}
      {"requirements" in part ? (
        <p>required skills {part.requirements.join(", ")}</p>
      ) : null}
    </div>
  );
};

export default Part;

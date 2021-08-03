import React from "react";
import { Card, Icon } from "semantic-ui-react";
import { Diagnosis, Entry } from "../types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HospitalEntry = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  return (
    <Card fluid style={{ padding: "1rem" }}>
      <Card.Header as="h2">
        {entry.date}
        <Icon name="hospital symbol" style={{ padding: "1rem" }} />
      </Card.Header>
      <p>
        <i>{entry.description}</i>
      </p>
      <ul>
        {!entry.diagnosisCodes
          ? null
          : entry.diagnosisCodes.map((code: string) => {
              const description: Diagnosis | undefined = diagnoses.find(
                (diagnosis) => diagnosis.code === code
              );
              return (
                <li key={code}>
                  {code} {description ? description.name : null}
                </li>
              );
            })}
      </ul>
    </Card>
  );
};

const OccupationalHealthcare = ({ entry }: { entry: Entry }) => {
  return (
    <Card fluid style={{ padding: "1rem" }}>
      <Card.Header as="h2">
        {entry.date}
        <Icon
          name="stethoscope"
          style={{ padding: "1rem", marginRight: "1rem" }}
        />
        {"employerName" in entry ? entry.employerName : null}
      </Card.Header>
      <p>
        <i>{entry.description}</i>
      </p>
    </Card>
  );
};

const HealthCheck = ({ entry }: { entry: Entry }) => {
  let heartColor: string;
  switch ("healthCheckRating" in entry ? entry.healthCheckRating : null) {
    case 0:
      heartColor = "green";
      break;
    case 1:
      heartColor = "yellow";
      break;
    case 2:
      heartColor = "orange";
      break;
    case 3:
      heartColor = "red";
      break;
    default:
      heartColor = "black";
      break;
  }
  return (
    <Card fluid style={{ padding: "1rem" }}>
      <Card.Header as="h2">
        {entry.date}
        <Icon name="doctor" style={{ padding: "1rem" }} />
      </Card.Header>
      <p>
        <i>{entry.description}</i>
      </p>
      <Icon name="heart" style={{ color: heartColor }} />
    </Card>
  );
};

const EntryDetail = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: Diagnosis[];
}) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntry entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    case "HealthCheck":
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetail;

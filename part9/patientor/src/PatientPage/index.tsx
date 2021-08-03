import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";
import { useStateValue, addPatient } from "../state";
import { Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        console.log("Fetching " + id);
        const fetched = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        dispatch(addPatient(fetched.data));
      } catch (error) {
        console.log(error);
      }
    };

    if (!patients[id]) {
      void fetchPatient();
    }
  }, []);

  const patient = patients[id];
  console.log(patient);
  if (!patient) {
    return null;
  } else {
    return (
      <Container>
        <h1>
          {patient.name}{" "}
          {patient.gender === "male" ? (
            <Icon name="mars" />
          ) : patient.gender === "female" ? (
            <Icon name="venus" />
          ) : (
            <Icon name="neuter" />
          )}
        </h1>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <h2>entries</h2>
        {patient.entries.map((entry: Entry) => (
          <div key={entry.id}>
            <p>{entry.description}</p>
            <ul>
              {!entry.diagnosisCodes
                ? null
                : entry.diagnosisCodes.map((code: string) => (
                    <li key={code}>{code}</li>
                  ))}
            </ul>
          </div>
        ))}
      </Container>
    );
  }
};

export default PatientPage;

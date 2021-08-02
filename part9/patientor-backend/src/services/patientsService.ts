import patients from "../data/patients";
import { NonSensitivePatient, Patient, NewPatient } from "../types";
import uuid = require("uuid");

const getAll = (): Array<NonSensitivePatient> => {
  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid.v1(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  addPatient,
};

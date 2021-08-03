import patients from "../data/patients";
import {
  NonSensitivePatient,
  Patient,
  NewPatient,
  PublicPatient,
} from "../types";
import uuid = require("uuid");

const getAll = (): Array<NonSensitivePatient> => {
  return patients.map((patient) => ({
    id: patient.id,
    name: patient.name,
    dateOfBirth: patient.dateOfBirth,
    gender: patient.gender,
    occupation: patient.occupation,
    entries: patient.entries,
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

const getPatient = (id: string): PublicPatient => {
  const patient = patients.find((patient) => patient.id === id);
  if (!patient) {
    throw new Error("patient not found");
  }
  return patient;
};

export default {
  getAll,
  addPatient,
  getPatient,
};

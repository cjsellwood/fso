/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";
const router = express.Router();
import patientsService from "../services/patientsService";

router.get("/", (_req, res) => {
  res.send(patientsService.getAll());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = patientsService.addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.json(newPatient);
});

export default router;

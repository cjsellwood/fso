import express from "express";
const router = express.Router();
import patientsService from "../services/patientsService";
import toNewPatient from "../utils";

router.get("/", (_req, res) => {
  res.send(patientsService.getAll());
});

router.post("/", (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(newPatient);
    res.json(addedPatient);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default router;

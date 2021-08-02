import express from "express";
const router = express.Router();
import diagnosesService from "../services/diagnosesService";

router.get("/", (_req, res) => {
  res.send(diagnosesService.getAll());
});

export default router;

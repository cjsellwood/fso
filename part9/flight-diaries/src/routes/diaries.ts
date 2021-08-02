import express from "express";
import diaryService from "../services/diaryService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diaryService.getNonSensitiveEntries());
});

router.post("/", (_res, res) => {
  res.send("Saving diary");
});

export default router;

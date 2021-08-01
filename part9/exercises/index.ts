import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("hello");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.json("malformatted parameters");
  }
  return res.json({
    height,
    weight,
    bmi: calculateBmi(Number(height), Number(weight)),
  });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    return res.json({ error: "parameters missing" });
  }

  if (isNaN(Number(target))) {
    return res.json({ error: "malformatted parameters" });
  }

  for (const arg of daily_exercises) {
    if (isNaN(Number(arg))) {
      return res.json({ error: "malformatted parameters" });
    }
  }

  console.log(daily_exercises, target);
  return res.json({ ...calculateExercises(daily_exercises, target) });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

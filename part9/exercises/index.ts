import express from "express";
import calculateBmi from "./bmiCalculator";
const app = express();

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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

interface CommandArgs {
  value1: number;
  value2: number;
}

const parseArguments = (args: Array<string>): CommandArgs => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;
  if (bmi >= 30) {
    return "Obese";
  } else if (bmi >= 25) {
    return "Overweight";
  } else if (bmi >= 18.5) {
    return "Normal (healthy weight)";
  } else {
    return "Underweight";
  }
};

const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);

try {
  const { value1, value2 } = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (err) {
  console.log("Error:", err.message);
}
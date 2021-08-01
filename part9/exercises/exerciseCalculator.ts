interface DailyExercises {
  dailyExercises: Array<number>;
  target: number;
}

const parseExercises = (args: Array<string>): DailyExercises => {
  if (args.length < 4) throw new Error("Not enough arguments");
  const targetArg: string = args[args.length - 1];

  if (isNaN(Number(targetArg))) {
    throw new Error("Target is not a number");
  }

  const daysArgs: Array<string> = args.slice(2, args.length - 1);
  for (const arg of daysArgs) {
    if (isNaN(Number(arg))) {
      throw new Error("Daily exercises are not all numbers");
    }
  }

  return {
    dailyExercises: daysArgs.map((arg) => Number(arg)),
    target: Number(targetArg),
  };
};

interface ExerciseInfo {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyExercise: Array<number>,
  target: number
): ExerciseInfo => {
  const average: number =
    dailyExercise.reduce((acc, cur) => acc + cur, 0) / dailyExercise.length;

  let rating: number;
  let ratingDescription: string;
  if (average >= target) {
    rating = 3;
    ratingDescription = "Great";
  } else if (average > target * 0.75) {
    rating = 2;
    ratingDescription = "Not too bad";
  } else {
    rating = 1;
    ratingDescription = "Poor";
  }

  return {
    periodLength: dailyExercise.length,
    trainingDays: dailyExercise.filter((hours) => hours > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { dailyExercises, target } = parseExercises(process.argv);
  console.log(calculateExercises(dailyExercises, target));
} catch (error) {
  if (error instanceof Error) {
    console.log(error.message);
  }
}

interface ExerciseInfo {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));

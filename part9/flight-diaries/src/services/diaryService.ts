import diaryData from "../data/diary";

import { DiaryEntry, NonSensitiveDiaryEntry } from "../types";

const diaries: Array<DiaryEntry> = diaryData;

const getEntries = (): Array<DiaryEntry> => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

const addDiary = () => {
  return [];
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
};

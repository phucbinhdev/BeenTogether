import { CardQuestion } from "../types";

const CUSTOM_QUESTIONS_KEY = "couple_connect_custom_questions";

export const getCustomQuestions = (): CardQuestion[] => {
  try {
    const stored = localStorage.getItem(CUSTOM_QUESTIONS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load custom questions", e);
    return [];
  }
};

export const saveCustomQuestion = (question: CardQuestion): CardQuestion[] => {
  try {
    const current = getCustomQuestions();
    const updated = [...current, question];
    localStorage.setItem(CUSTOM_QUESTIONS_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error("Failed to save custom question", e);
    return [];
  }
};

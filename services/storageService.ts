import { AnswerRecord, CardQuestion } from "../types";

const CUSTOM_QUESTIONS_KEY = 'couple_connect_custom_questions';
const ANSWER_HISTORY_KEY = 'couple_connect_history';

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

export const getAnswerHistory = (): AnswerRecord[] => {
  try {
    const stored = localStorage.getItem(ANSWER_HISTORY_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to load history", e);
    return [];
  }
};

export const saveAnswer = (record: AnswerRecord): void => {
  try {
    const current = getAnswerHistory();
    // Prepend new answer
    const updated = [record, ...current];
    localStorage.setItem(ANSWER_HISTORY_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save answer", e);
  }
};

export const clearHistory = (): void => {
    localStorage.removeItem(ANSWER_HISTORY_KEY);
};
import { storage } from './Providers';

export interface Attempt {
  timestamp: string;
  letter: string;
  outcome: 'Success' | 'Failure';
}

const ATTEMPTS_DATA = 'attempts_data';

export const getAttempts = () => {
  const attempts = storage.getString(ATTEMPTS_DATA);
  const parsedAttempts = attempts ? JSON.parse(attempts) : [];

  return parsedAttempts;
};

export const addAttempt = (attempt: Attempt) => {
  const existingAttempts = storage.getString(ATTEMPTS_DATA);
  const parsedAttempts = existingAttempts ? JSON.parse(existingAttempts) : [];
  const updatedData = [...parsedAttempts, attempt];
  storage.set(ATTEMPTS_DATA, JSON.stringify(updatedData));
};

export const clearAttempts = () => storage.delete(ATTEMPTS_DATA);

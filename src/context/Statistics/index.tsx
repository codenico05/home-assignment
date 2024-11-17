import React, { createContext, useEffect, useState } from 'react';

import { Attempt, addAttempt, clearAttempts, getAttempts } from '@src/app/mmkvConfig';

type Summary = {
  sum: number;
  successRate: number;
};

interface StatisticsContextType {
  summary: Summary;
  attempts: Attempt[];
  addNewAttempt: (attempt: Attempt) => void;
  clearStatistics: () => void;
}

const defaultValue: StatisticsContextType = {
  summary: {
    sum: 0,
    successRate: 0,
  },
  attempts: [],
  addNewAttempt: () => {},
  clearStatistics: () => {},
};

export const StatisticsContext = createContext<StatisticsContextType>(defaultValue);

const StatisticsContextProvider = ({ children }: React.PropsWithChildren) => {
  const [summary, setSummary] = useState<Summary>({ sum: 0, successRate: 0 });
  const [attempts, setAttempts] = useState<Attempt[]>([]);

  useEffect(() => {
    const currentAttempts = getAttempts();
    setAttempts(currentAttempts);
    updateSummary(currentAttempts);
  }, []);

  const updateSummary = (newAttempts: Attempt[]) => {
    const sum = newAttempts.length;
    const success = newAttempts.filter(attempt => attempt.outcome === 'Success');
    setSummary({
      sum,
      successRate: newAttempts.length > 0 ? (success.length / sum) * 100 : 0,
    });
  };

  const addNewAttempt = (attempt: Attempt) => {
    addAttempt(attempt);
    const updatedAttempts = [...attempts, attempt];
    setAttempts(updatedAttempts);
    updateSummary(updatedAttempts);
  };

  const clearStatistics = () => {
    clearAttempts();
    setAttempts([]);
    setSummary({ sum: 0, successRate: 0 });
  };

  return (
    <StatisticsContext.Provider value={{ attempts, summary, addNewAttempt, clearStatistics }}>
      {children}
    </StatisticsContext.Provider>
  );
};

export default StatisticsContextProvider;

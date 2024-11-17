import { useContext } from 'react';

import { StatisticsContext } from '@src/context/Statistics';

export const useStatistics = () => {
  const { attempts, summary, addNewAttempt, clearStatistics } = useContext(StatisticsContext);

  return { attempts, summary, addNewAttempt, clearStatistics };
};

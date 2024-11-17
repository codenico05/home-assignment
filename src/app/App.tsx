import React from 'react';

import TabRoutes from '@src/screens/tabs';

import Providers from './Providers';

const App = () => {
  return (
    <Providers>
      <TabRoutes />
    </Providers>
  );
};

export default App;

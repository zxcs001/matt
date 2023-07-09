import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import Header from './components/header';

export const Routes = () => {
  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}><Outlet /></Suspense>
    </>
  );
};

export default Routes;

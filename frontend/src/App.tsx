import React, { Suspense, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import NavBar from './components/Layout/NavBar';
import Main from './components/Layout/Main';

import './App.module.scss';
import Information from './components/Map/Information/Information';

const Map = React.lazy(() => import('./components/Map/Map'));
const Donation = React.lazy(() => import('./components/Donation/Donation'));
const Statistics = React.lazy(
  () => import('./components/Statistics/Statistics')
);

const App = () => {
  return (
    <>
      <NavBar />
      <Suspense fallback={<p>Loading...</p>}>
        <Main>
          <Routes>
            <Route path="/" element={<Navigate to="/map" replace />} />
            <Route path="/map" element={<Map />} >
              <Route path="information" element={<Information />} />
            </Route>
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/donation" element={<Donation />} />
            <Route path="*" element={<p>Not Found</p>} />
          </Routes>
        </Main>
      </Suspense>
    </>
  );
};

export default App;

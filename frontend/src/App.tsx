import React, { Suspense, useContext, useEffect } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import NavBar from './components/Layout/NavBar';
import Main from './components/Layout/Main';
import FeedbackContext from './store/feedback-context';
import Information from './components/Map/Information/Information';
import Terms from './components/Map/Information/Terms';
import FeedbackBar from './components/UI/FeedbackBar';

import './App.module.scss';
import LoadingIcon from './components/UI/LoadingIcon';

const Map = React.lazy(() => import('./components/Map/Map'));
const Donation = React.lazy(() => import('./components/Donation/Donation'));
const Statistics = React.lazy(
  () => import('./components/Statistics/Statistics')
);

const App = () => {
  const ctx = useContext(FeedbackContext);

  return (
    <>
      {ctx.isMessageShown && <FeedbackBar>{ctx.message}</FeedbackBar>}
      <NavBar />
      <Suspense fallback={<LoadingIcon />}>
        <Main>
          <Routes>
            <Route path="/" element={<Navigate to="/map" replace />} />
            <Route path="/map" element={<Map />}>
              <Route path="information" element={<Information />} />
              <Route path="terms" element={<Terms />} />
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

import React, { Suspense, useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import NavBar from './components/Layout/NavBar';
import Main from './components/Layout/Main';
import FeedbackContext from './store/feedback-context';
import Information from './components/Map/Information/Information';
import Terms from './components/Map/Information/Terms';
import FeedbackBar from './components/UI/FeedbackBar';
import LoadingIcon from './components/UI/Loading/LoadingIcon';

import './App.module.scss';
import NotFound from './components/UI/NotFound/NotFound';

import Statistics from './components/Statistics/Statistics';
import About from './components/About/About';

const Map = React.lazy(() => import('./components/Map/Map'));
const Login = React.lazy(() => import('./components/Admin/Login'));
const Admin = React.lazy(() => import('./components/Admin/Admin'));

const App = () => {
  const ctx = useContext(FeedbackContext);

  return (
    <>
      <Helmet>
        <title>Warpaint Sound</title>
        <meta
          name="description"
          content="Check the sounds of musical instruments around the world."
        />
        <meta
          name="keywords"
          content="Sound, Audio, Musical Instruments, Warpaint Sound, Warpaint Vision"
        />
      </Helmet>
      {ctx.isMessageShown && <FeedbackBar>{ctx.message}</FeedbackBar>}
      <NavBar />
      <Suspense fallback={<LoadingIcon />}>
        <Main>
          <Routes>
            <Route
              path="/"
              element={<Navigate to="/map/information" replace />}
            />
            <Route
              path="/home"
              element={<Navigate to="/map/information" replace />}
            />
            <Route path="/map" element={<Map />}>
              <Route path="information" element={<Information />} />
              <Route path="terms" element={<Terms />} />
            </Route>
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Main>
      </Suspense>
    </>
  );
};

export default App;

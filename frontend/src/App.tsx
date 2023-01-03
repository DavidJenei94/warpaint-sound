import React, { Suspense, useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import NavBar from './components/Layout/NavBar';
import Main from './components/Layout/Main';
import FeedbackContext from './store/feedback-context';
import Information from './components/Map/Information/Information';
import Terms from './components/Map/Information/Terms';
import FeedbackBar from './components/UI/FeedbackBar';
import LoadingIcon from './components/UI/LoadingIcon';

import './App.module.scss';
import NotFound from './components/UI/NotFound/NotFound';

const Map = React.lazy(() => import('./components/Map/Map'));
const About = React.lazy(() => import('./components/About/About'));
const Login = React.lazy(() => import('./components/Admin/Login'));
const Admin = React.lazy(() => import('./components/Admin/Admin'));
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

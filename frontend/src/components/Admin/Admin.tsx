import { useContext, useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useTokenCheck from '../../hooks/useTokenCheck';
import AuthContext from '../../store/auth-context';

import Button from '../UI/Button';
import Input from '../UI/Input';
import LoadingIcon from '../UI/LoadingIcon';

import styles from './Admin.module.scss';

const Admin = () => {
  const authCtx = useContext(AuthContext);

  const isTokenChecked = useTokenCheck();

  if (!isTokenChecked) {
    return <LoadingIcon />;
  }

  if (!authCtx.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <div>List of Sound Records</div>;
};

export default Admin;

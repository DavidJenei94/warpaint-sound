import { ChangeEvent, useContext, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Navigate, useNavigate } from 'react-router-dom';
import useRecaptchaVerify from '../../hooks/useRecaptchaVerify';
import useTokenCheck from '../../hooks/useTokenCheck';
import AuthContext from '../../store/auth-context';
import FeedbackContext from '../../store/feedback-context';
import { backendUrl } from '../../utils/general.utils';

import Button from '../UI/Button';
import Input from '../UI/Input';
import LoadingIcon from '../UI/Loading/LoadingIcon';

import styles from './Login.module.scss';

const Login = () => {
  const navigate = useNavigate();

  const { executeRecaptcha } = useGoogleReCaptcha();
  const handleReCaptchaVerify = useRecaptchaVerify(executeRecaptcha);

  const authCtx = useContext(AuthContext);
  const feedbackCtx = useContext(FeedbackContext);

  const [password, setPassword] = useState<string>('');
  const isTokenChecked = useTokenCheck();

  const formIsValid: boolean = password ? true : false;

  if (authCtx.isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const loginHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    try {
      const reCaptchaToken = await handleReCaptchaVerify();

      const response = await fetch(`${backendUrl}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: password,
          reCaptchaToken: reCaptchaToken
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Could not login User!');
      }

      authCtx.login(data.token);

      navigate('/admin', { replace: true });
    } catch (error: any) {
      feedbackCtx.showMessage(error.message, 4000);
    }
  };

  if (!isTokenChecked) {
    return <LoadingIcon />;
  }

  return (
    <div className={styles.container}>
      <h2>Admin login</h2>
      <form onSubmit={loginHandler}>
        <label>Password:</label>
        <br />
        <Input value={password} onChange={changeHandler} type="password" />
        <br />
        <Button disabled={!formIsValid}>
          <p>Login</p>
        </Button>
      </form>
    </div>
  );
};

export default Login;

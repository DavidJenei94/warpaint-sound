import { createContext, useState } from 'react';
import { refreshToken } from '../service/auth-api';

const AuthContext = createContext({
  token: '',
  isAuthenticated: false,
  login: (token: string) => {},
  checkToken: (): any => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');

  const loginHandler = (token: string) => {
    setIsAuthenticated(token ? true : false);
    setToken(token);

    localStorage.setItem('token', token);
  };

  const checkToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setIsAuthenticated(false);
      setToken('');
      return;
    }

    // Expiration is checked on server side
    const newToken = await refreshToken(token);

    if (!newToken) {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
      setToken('');
      return;
    }

    setIsAuthenticated(true);
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };

  return (
    <AuthContext.Provider
      value={{
        token: token,
        isAuthenticated: isAuthenticated,
        login: loginHandler,
        checkToken: checkToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

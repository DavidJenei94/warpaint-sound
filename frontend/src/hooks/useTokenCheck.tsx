import { useContext, useEffect, useState } from "react";
import AuthContext from "../store/auth-context";

const useTokenCheck = () => {
  const authCtx = useContext(AuthContext);
  const [isTokenChecked, setIsTokenChecked] = useState<boolean>(false);

  // Refresh token
  useEffect(() => {
    const checkToken = async () => {
      await authCtx.checkToken();
      setIsTokenChecked(true);
    };

    checkToken();
  }, []);

  return isTokenChecked;
}

export default useTokenCheck;
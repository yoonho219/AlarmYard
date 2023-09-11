import React, { createContext, useCallback, useContext, useState } from "react";

export const LoginContext = createContext<
  [Boolean, (check: string) => void, () => void]
>([false, (check: string) => {}, () => {}]);

export function useIsLoginContext() {
  return useContext(LoginContext);
}

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const setLogin = useCallback(
    (access_token: string) => {
      setIsLogged(true);
      window.sessionStorage.setItem("accessToken", access_token);
    },
    [setIsLogged]
  );

  const logout = useCallback(() => {
    setIsLogged(false);
    window.sessionStorage.clear();
  }, [setIsLogged]);

  return (
    //ASK : value를 배열 대신 객체로
    <LoginContext.Provider value={[isLogged, setLogin, logout]}>
      {children}
    </LoginContext.Provider>
  );
};

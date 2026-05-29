import { createContext, useEffect, useState } from "react";
import { checkAuth } from "../Services/AuthServices";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const verifyAuth = async () => {
      const data = await checkAuth();
      if (data.isLoggedIn) {
        setIsLoggedIn(true);
        setUser(data.user);
        setLoading(false);
      }
      setLoading(false);
    };
    verifyAuth();
  }, []);

  return (
    <>
      <AuthContext.Provider
        value={{
          isLoggedIn,
          setIsLoggedIn,
          user,
          setUser,
          loading,
          setLoading,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
